import { Contract, Wallet, JsonRpcSigner, type ContractRunner, TransactionResponse, JsonRpcProvider } from "ethers";
import { erc20Abi } from "../abi/erc20-abi";
import { isObjectAddressable } from "../../utils/is-object-addressable";
import { INetworkConfig } from "../../types/network";
import { IAddressable } from "../../types/IAddressable";

export class ERC20 implements IAddressable {
    private _contract: Contract;
    private readonly _runner: ContractRunner | null | undefined;

    constructor(address: string, network: INetworkConfig) {
        const provider = new JsonRpcProvider(
            network.rpcUrl,
            { chainId: network.id, name: "custom" },
            { staticNetwork: true}
        );
        this._contract = new Contract(address, erc20Abi, provider);
        this._runner = provider;
    }

    public get interface() {
        return this._contract.interface;
    }

    public get address(): string {
        return this._contract.target as string;
    }

    public get abi() {
        return erc20Abi;
    }

    public getEncodedApprove(spender: string, amount: bigint): string {
        return this._contract.interface.encodeFunctionData("approve", [spender, amount]);
    }

    public getEncodedTransfer(to: string, amount: bigint): string {
        return this._contract.interface.encodeFunctionData("transfer", [to, amount]);
    }

    public getEncodedTransferFrom(from: string, to: string, amount: bigint): string {
        return this._contract.interface.encodeFunctionData("transferFrom", [from, to, amount]);
    }


    /*******************************************************************************/
    /*                         EIP20 standard GET functions                        */
    /*******************************************************************************/

    public async getBalance(address: string): Promise<bigint> {
        try {
            if (!this._contract.balanceOf) {
                throw new Error("`function balanceOf` is not supported by this _contract. Or update your abi");
            }
            return await this._contract.balanceOf(address);
        } catch (error) {
            throw error;
        }
    }

    public async getDecimals(): Promise<bigint> {
        try {
            if (!this._contract.decimals) {
                throw new Error("`function decimals` is not supported by this _contract. Or update your abi");
            }
            return await this._contract.decimals();
        } catch (error) {
            throw error;
        }
    }

    public async getSymbol(): Promise<string> {
        try {
            if (!this._contract.symbol) {
                throw new Error("`function symbol` is not supported by this _contract. Or update your abi");
            }
            return await this._contract.symbol();
        } catch (error) {
            throw error;
        }
    }

    public async getName(): Promise<string> {
        try {
            if (!this._contract.name) {
                throw new Error("`function name` is not supported by this _contract. Or update your abi");
            }
            return await this._contract.name();
        } catch (error) {
            throw error;
        }
    }

    public async getTotalSupply(): Promise<bigint> {
        try {
            if (!this._contract.totalSupply) {
                throw new Error("`function totalSupply` is not supported by this _contract. Or update your abi");
            }
            return await this._contract.totalSupply();
        } catch (error) {
            throw error;
        }
    }

    public async getAllowance(owner: string, spender: string): Promise<bigint> {
        try {
            if (!this._contract.allowance) {
                throw new Error("`function allowance` is not supported by this _contract. Or update your abi");
            }
            return await this._contract.allowance(owner, spender);
        } catch (error) {
            throw error;
        }
    }



    /*******************************************************************************/
    /*                        EIP20 standard POST functions                        */
    /*******************************************************************************/
    
    public async transfer(to: string, amount: bigint): Promise<boolean> {
        try {
            if (!this._contract.transfer) {
                throw new Error("`function transfer` is not supported by this _contract. Or update your abi");
            }
            return await this._contract.transfer(to, amount);
        } catch (error) {
            throw error;
        }
    }

    public async transferFrom(from: string, to: string, amount: bigint): Promise<boolean> {
        try {
            if (!this._contract.transferFrom) {
                throw new Error("`function transferFrom` is not supported by this _contract. Or update your abi");
            }
            return await this._contract.transferFrom(from, to, amount);
        } catch (error) {
            throw error;
        }
    }

    public async approve(spender: string, amount: bigint, overrides?: {
        gasLimit?: number,
        maxFeePerGas?: number,
        maxPriorityFeePerGas?: number,
    }): Promise<TransactionResponse> {
        try {
            if (!this._contract.approve) {
                throw new Error("`function approve` is not supported by this _contract. Or update your abi");
            }

            if(overrides) {
                return await this._contract.approve(spender, amount, overrides);
            }

            return await this._contract.approve(spender, amount);
        } catch (error) {
            throw error;
        }
    }


    /*******************************************************************************/
    /*                             Extension functions                             */
    /*******************************************************************************/

    public async addAllowance(spender: string, amount: bigint): Promise<boolean> {
        const runnerAddress = this._getRunnerAddress();
        if(!runnerAddress) {
            throw new Error("No runner provided");
        }

        try {
            const oldAllowance = await this.getAllowance(runnerAddress, spender);
            return await this._contract.approve(spender, oldAllowance + amount);
        } catch (error) {
            throw error;
        }
    }

    public async subAllowance(spender: string, amount: bigint): Promise<boolean> {
        const runnerAddress = this._getRunnerAddress();
        if(!runnerAddress) {
            throw new Error("No runner provided");
        }

        try {
            const oldAllowance = await this.getAllowance(runnerAddress, spender);

            if(oldAllowance === 0n) {
                return true;
            }

            const newAllowance = oldAllowance > amount ? oldAllowance - amount : 0n;
            return await this._contract.approve(spender, newAllowance);
        } catch (error) {
            throw error;
        }
    }

    public async revokeApprove(spender: string): Promise<boolean> {
        try {
            if (!this._contract.approve) {
                throw new Error("`function approve` is not supported by this _contract. Or update your abi");
            }
            return await this._contract.approve(spender, 0);
        } catch (error) {
            throw error;
        }
    }

    private _getRunnerAddress(): string {
        if(!this._runner) {
            throw new Error("No runner provided");
        }


        if (
            this._runner instanceof Wallet ||
            this._runner instanceof JsonRpcSigner || 
            isObjectAddressable(this._runner)
        ) {
            return this._runner.address;
        }

        return "";
    }
}
