class EncounterVo extends BaseVo{
    public info : any = null;//   info = {lv=1,eIndex={}}, --激活信息1：激活1个效果
    public buff : any = null;// buff = {—服务端使用    servant = {}, --门客信息 wife = {}, --红颜信息 all_Child = 0,--所有子嗣信息 
    
	public constructor(){
		super();
	}

	public initData(data:any):void{
        this.info = data.info;
        this.buff = data.buff;
	}

	public dispose(){
    }
}