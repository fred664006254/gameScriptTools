class ZhenqifangVo extends BaseVo{
    public freefresh : number = 0;
    public freeitask : number = 0;
    public friend : any = null;
    public ftask : any[] = [];
    public info : any = null;
    public itask : any[] = [];
    public level : number = 0;
    public shop : any = null;
    public exp : number = 0;
    private _oldlv : number = 0;
    public constructor(){
		super();
	}

	public initData(data:any):void{
        if(data){
            if(!this._oldlv){
                this._oldlv = data.level;
            }
            for(let i in data){
                this[i] = data[i];
            }
        }
        if(this.level > this._oldlv || (GameData.serverTime <= (App.DateUtil.getWeeTs(GameData.serverTime) + 3) &&  App.DateUtil.getWeeTs(GameData.serverTime) <= GameData.serverTime)){
            Api.zhenqifangVoApi.freshlist = true;
            Api.zhenqifangVoApi.freshfriendlist = true;
        }
        this._oldlv = this.level;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_DATAREFRESH);
    }

    public dispose():void{
        this.freefresh = 0;
        this.freeitask = 0;
        this.friend = null;
        this.ftask = null
        this.info = null;
        this.itask = null
        this.level = 0;
        this.shop = null;
        this.exp = 0;
        this._oldlv = 0;
	}
}