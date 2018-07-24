import XDeferred, { IDeferred } from 'xdeferred/build/module/XDeferred';
export class XSingle<T> {
  constructor() {
  }
  private instance!: T;
  private readyDeferreds: IDeferred<T>[] = [];
  private readyCallbacks: { (instance: any): void }[] = [];
  private alerted: boolean = false;
  async Ready(callback?: { (instance: T): void }, alertTimer: number = 6000): Promise<T> {
    if (this.instance) {
      setTimeout(() => callback && callback(this.instance), 0);
      return this.instance;
    }
    callback && this.readyCallbacks.push(callback);
    let dfd = new XDeferred<T>();
    this.readyDeferreds.push(dfd);
    if (alertTimer)
      setTimeout(() => {
        if (!this.Exist && !this.alerted) {
          this.alerted = true;
          throw new Error('Do not SetInstance() after 6secs from first Ready().');
          // console.error('Do not SetInstance() after 6secs from first Ready().')
        }
      }, alertTimer);
    return dfd.promise();
  }
  SetInstance(instance: T): T {
    this.instance = instance;
    for (const cb of this.readyCallbacks)
      setTimeout(() => cb(this.instance), 0);
    this.readyCallbacks = [];
    for (const dfd of this.readyDeferreds)
      setTimeout(() => dfd.resolve(this.instance), 0);
    this.readyDeferreds = [];
    return instance;
  }
  get Exist(): boolean {
    return !!this.instance;
  }
  // Remove() {
  //   if (this.Exist {
  //     delete Single.instances[key];
  //     delete Single.readyCallbacks[key];
  //     delete Single.readyDeferreds[key];
  //   }
  // }
}

export default XSingle;