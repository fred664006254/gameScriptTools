/**
 * 红点api
 */
namespace Api
{
    export namespace RedpointVoApi
    {
    
        let redpointVo:RedpointVo;
        let initRedpoint=null;
    
        export function checkHaveRedPointByAid(aid : string, type? : string):boolean{
            let flag = false;
            if(this.redpointVo){
                flag = this.redpointVo.checkHavePointByAid(aid,type);
            }
            return flag;
        }
    
        export function formatInitRedpoint(data:any):void
        {
            this.initRedpoint=data;
        }
    
        /**
         * 检测红点,暂时只支持initRedpoint字段，后续功能统一红点需扩展
         * @param model 
         */
        export function checkRedPoint(model:string):boolean
        {
            return !!this.initRedpoint[model];
        }

        export function setRedPointStatus(model:string, status:boolean){
            this.initRedpoint[model] = status;
        }
    
        export function dispose():void{
            this.initRedpoint=null;
            this.redpointVo=null;
        }
    }

}