import { Contract, Wallet, JsonRpcSigner, type ContractRunner, TransactionResponse, JsonRpcProvider, NonceManager } from "ethers";
import { erc20Abi } from "../abi/erc20-abi";
import { isObjectAddressable } from "../../utils/is-object-addressable";
import type { INetworkConfig } from "../../types/network";
import type { IAddressable } from "../../types/IAddressable";
import type { TAddress } from "../../types/hex";
import type { IERC20Settings } from "../types";

export class ERC20 implements IAddressable {
    private readonly _network: INetworkConfig;
    private readonly _abi: any;
    protected readonly _contract: Contract;
    private readonly _runner: ContractRunner | null | undefined;
    private readonly _runnerWithNonceManager: NonceManager | null | undefined;

    constructor({
        address,
        network,
        abi = erc20Abi,
        privateKey,
    }: IERC20Settings) {
        this._abi = abi;
        this._network = network;
        const provider = new JsonRpcProvider(
            network.rpcUrl,
            { chainId: network.id, name: "custom" },
            { staticNetwork: true }
        );

        if (privateKey !== undefined && privateKey !== null && privateKey.length > 0) {
            this._runner = new Wallet(privateKey, provider);
            this._runnerWithNonceManager = new NonceManager(this._runner as Wallet);
            this._contract = new Contract(address, abi, this._runnerWithNonceManager);
            return;
        }

        this._runner = provider;
        this._contract = new Contract(address, abi, provider);
    }

    public get interface() {
        return this._contract.interface;
    }

    public get address(): TAddress {
        return this._contract.target as TAddress;
    }

    public get abi() {
        return this._abi;
    }

    public get network(): INetworkConfig {
        const { wssUrl, rpcUrl } = this._network;
        if(wssUrl !== undefined) {
            return this._network;
        }

        // replace: http:// → ws://
        // replace: https:// → wss://
        const wss = rpcUrl
            .replace(/^http:\/\//i, "ws://")
            .replace(/^https:\/\//i, "wss://");

        // return new object
        return {
            ...this._network,
            wssUrl: wss,
        };
    }

    public getEncodedApprove(spender: TAddress, amount: bigint): string {
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
        // @ts-expect-error: ABI methods are attached at runtime by ethers
        return await this._contract.balanceOf(address);
    }

    public async getDecimals(): Promise<bigint> {
        // @ts-expect-error: ABI methods are attached at runtime by ethers
        return await this._contract.decimals();
    }

    public async getSymbol(): Promise<string> {
        // @ts-expect-error: ABI methods are attached at runtime by ethers
        return await this._contract.symbol();
    }

    public async getName(): Promise<string> {
        // @ts-expect-error: ABI methods are attached at runtime by ethers
        return await this._contract.name();
    }

    public async getTotalSupply(): Promise<bigint> {
        // @ts-expect-error: ABI methods are attached at runtime by ethers
        return await this._contract.totalSupply();
    }

    public async getAllowance(owner: TAddress, spender: TAddress): Promise<bigint> {
        // @ts-expect-error: ABI methods are attached at runtime by ethers
        return await this._contract.allowance(owner, spender);
    }



    /*******************************************************************************/
    /*                        EIP20 standard POST functions                        */
    /*******************************************************************************/
    
    public async transfer(to: TAddress, amount: bigint): Promise<TransactionResponse> {
        if(this._runnerWithNonceManager === undefined) {
            throw new Error('Wallet has not been provided');
        }
        // @ts-expect-error: ABI methods are attached at runtime by ethers
        return await this._contract.transfer(to, amount);
    }

    public async transferFrom(from: TAddress, to: TAddress, amount: bigint): Promise<TransactionResponse> {
        if(this._runnerWithNonceManager === undefined) {
            throw new Error('Wallet has not been provided');
        }
        // @ts-expect-error: ABI methods are attached at runtime by ethers
        return await this._contract.transferFrom(from, to, amount);
    }

    public async approve(spender: TAddress, amount: bigint): Promise<TransactionResponse> {
        if(this._runnerWithNonceManager === undefined) {
            throw new Error('Wallet has not been provided');
        }
        // @ts-expect-error: ABI methods are attached at runtime by ethers
        return await this._contract.approve(spender, amount);
    }


    /*******************************************************************************/
    /*                             Extension functions                             */
    /*******************************************************************************/

    public async addAllowance(spender: TAddress, amount: bigint): Promise<TransactionResponse> {
        const runnerAddress = this._getRunnerAddress();
        if(!runnerAddress) {
            throw new Error("No runner provided");
        }

        const oldAllowance = await this.getAllowance(runnerAddress, spender);
        // @ts-expect-error: ABI methods are attached at runtime by ethers
        return await this._contract.approve(spender, oldAllowance + amount);
    }

    public async subAllowance(spender: string, amount: bigint): Promise<boolean> {
        const runnerAddress = this._getRunnerAddress();
        if(!runnerAddress) {
            throw new Error("No runner provided");
        }

        const oldAllowance = await this.getAllowance(runnerAddress, spender);

        if(oldAllowance === 0n) {
            return true;
        }

        const newAllowance = oldAllowance > amount ? oldAllowance - amount : 0n;
        // @ts-expect-error: ABI methods are attached at runtime by ethers
        return await this._contract.approve(spender, newAllowance);
    }

    public async revokeApprove(spender: string): Promise<boolean> {
        // @ts-expect-error: ABI methods are attached at runtime by ethers
        return await this._contract.approve(spender, 0);
    }

    protected _getRunnerAddress(): string {
        if(!this._runner || !this._runnerWithNonceManager) {
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
