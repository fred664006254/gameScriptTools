namespace Api
{
    export namespace DailytaskVoApi
    {
        let taskInfoVo:TaskInfoVo;
        let touchTaskIndex:number = 0;
        let touchID:string;

        export function formatData(data:any):void
		{
            if(!taskInfoVo){
                taskInfoVo = new TaskInfoVo();
            }
            taskInfoVo.initData(data);
        }
        
        export function getTaskInfoVo(){
            return taskInfoVo;
        }

        export function canRefresh(index):boolean{

            return taskInfoVo.freshFlag == 0 && taskInfoVo.taskInfo[index].f == 0;
        }

        export function getRandomTaskByID(taskID:string):TaskInfo{
            let task:TaskInfo;
            for (let index = 0; index < taskInfoVo.taskInfo.length; index++) {
                const element = taskInfoVo.taskInfo[index];
                if(element.id == taskID){
                    task = element;
                    break;
                }
            }
            return task;
        }

        export function getRandomTasks():Array<TaskInfo>{
            return taskInfoVo.taskInfo;
        }

        export function getRandomTaskByIndex(index:number):TaskInfo{
           
            return taskInfoVo.taskInfo[index];
        }

        export function getDailyGet(index){
            switch (index) {
                case 0:
                    return taskInfoVo.freeGet1;
                case 1:
                    return taskInfoVo.freeGet2;
                case 2:
                    return taskInfoVo.freeGet3;
                default:
                    break;
            }
        }

        export function getDailyBox(){
            let count = 0;
            count = (taskInfoVo.freeGet1 == 0) ? (count + 1) : count; 
            count = (taskInfoVo.freeGet2 == 0) ? (count + 1) : count; 
            count = (taskInfoVo.freeGet3 == 0) ? (count + 1) : count; 
            taskInfoVo.taskInfo.forEach(element => {
                count = (element.f == 1) ? (count + 1) : count;
            });
            return count;
        }

		export function dispose():void
		{
            taskInfoVo = null;
        }

        export function setTouchTaskIndex(value){
            touchTaskIndex = value;
        }

        export function getTouchTaskIndex(){
            return touchTaskIndex;
        }

        export function getTouchID(){
            for (let index = 0; index < taskInfoVo.taskInfo.length; index++) {
                if(taskInfoVo.taskInfo[index].index == touchTaskIndex){
                    return taskInfoVo.taskInfo[index].id
                }
                
            }
            // return taskInfoVo.taskInfo[touchTaskIndex].id;
        }

        export function getTaskListData(){
            let arr = [
                {type:1}
            ];
            let tem = [];
            for (let index = 0; index < taskInfoVo.taskInfo.length; index++) {
                if(taskInfoVo.taskInfo[index].f == 2) {
                    tem.push({type:2});
                } else {
                    arr.push({type:2});
                }
            }

            return arr.concat(tem);
        }

        export function canGetOrpBox():boolean{
            return Api.UserinfoVoApi.getCardBox() > 0;
        }
    }
}