/*
 *@description: 任务数据
 *@author: hwc 
 *@date: 2020-04-11 20:28:04
 *@version 0.0.1
 */

class TaskInfoVo extends BaseVo {

    public lastday:number = 0;
    /** 每日奖励领取第一个物品 */
    public freeGet1:number = 0;
    /** 每日奖励领取第二个物品 */
    public freeGet2:number = 0;
    /** 每日奖励领取第三个物品 */
    public freeGet3:number = 0;
    /** 任务刷新标记 */
    public freshFlag:number = 0;

    public taskInfo:Array<TaskInfo> = [];

    public initData(data: any): void {
        if(!data||!data.info)
            return;
        this.lastday = data.lastday || this.lastday;
        this.freeGet1 = data.info.freeGet1 || this.freeGet1;
        this.freeGet2 = data.info.freeGet2 || this.freeGet2;
        this.freeGet3 = data.info.freeGet3 || this.freeGet3;
        this.freshFlag = data.info.freshFlag;
        
        data.info.taskInfo.forEach((element, index)=> {
            this.taskInfo[index] = {
                id: element.id,
                v: element.v,
                f: element.f,
                index:index
                }
        });
        let arrTasks = [];
        let finishTasks = [];
        let endTasks = [];
        for (let index = 0; index < this.taskInfo.length; index++) {
            const element = this.taskInfo[index];
            switch (element.f) {
                case 0:
                    arrTasks.push(element);
                    break;
                case 1:
                    finishTasks.push(element);
                    break
                case 2:
                    endTasks.push(element);
                    break;
                default:
                    break;
            }
        }
        this.taskInfo = finishTasks.concat(arrTasks).concat(endTasks);
    }    
    
    public dispose(): void {
       this.lastday = 0;
       this.freeGet1 = 0;
       this.freeGet2 = 0;
       this.freeGet3 = 0;
       this.freshFlag = 0;
       this.taskInfo = [];
    }
}

interface TaskInfo {
    /**
     * 任务 id
     */
    id:string;
    /**
     * 任务的已完成值
     */
    v:number;
    /**
     * 任务完成以及领取标记 0 未完成 1完成 2已领取
     */
    f:number;
    /**
     * index 索引值
     */
    index:number;
}