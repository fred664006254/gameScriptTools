/**
 * 红点api
 */
class RedpointVoApi extends BaseVoApi{

    private redpointVo:RedpointVo;
    private initRedpoint=null;
    public constructor(){
		super();
	}

    public checkHaveRedPointByAid(aid : string, type? : string):boolean{
        let flag = false;
        if(this.redpointVo){
            flag = this.redpointVo.checkHavePointByAid(aid,type);
        }
        return flag;
    }

    public formatInitRedpoint(data:any):void
    {
        this.initRedpoint=data;
    }

    /**
     * 检测红点,暂时只支持initRedpoint字段，后续功能统一红点需扩展
     * @param model 
     */
    public checkRedPoint(model:string):boolean
    {
        return !!this.initRedpoint[model];
    }

    public dispose():void{
        this.initRedpoint=null;
        this.redpointVo=null;
		super.dispose();
	}
}