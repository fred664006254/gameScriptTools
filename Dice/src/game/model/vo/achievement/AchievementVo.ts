

class AchievementVo extends BaseVo{
    
    public info:{[key:string]:Achinfo} = null;

    public initData(data: any): void {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                this[key] = data[key];
                
            }
        }
    }
    public dispose(): void {
        this.info = null;
    }

}

interface Achinfo{
    /**当前阶段 */
    stage:number;
    /**当前值 */
    v:number;
    /**是否完成或领取0 1 2 */
    f:number;
}