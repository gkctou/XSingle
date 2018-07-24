export declare class XSingle<T> {
    constructor();
    private instance;
    private readyDeferreds;
    private readyCallbacks;
    private alerted;
    Ready(callback?: {
        (instance: T): void;
    }, alertTimer?: number): Promise<T>;
    SetInstance(instance: T): T;
    readonly Exist: boolean;
}
export default XSingle;
