class MergeServerVoApi extends BaseVoApi
{
	public constructor()
	{
		super();
    }
    
    private mergeZidCfg : any = null;

	public formatData(data:any):void
	{
		// super.formatData(data);
		this.mergeZidCfg = data;
    }
    
    /**
     * 是否属于合服区
    */
    private isMergeSever(sid):boolean
    {
        //let sid = Number(ServerCfg.selectServer.zid);
        for(let i in this.mergeZidCfg){
            if(this.mergeZidCfg[i] && Number(i) == Number(sid)){
                return true;
            }
        }
        return false;
    }


    //根据zid 得到合服之后的区
    public getQuByZid(zid: number):number{
        if(this.mergeZidCfg[zid]){
            let newzoneid = this.mergeZidCfg[zid].split('-');
            return newzoneid[0];
        } else {
            return 0;
        }
        
        
    }

    /**
     * 获取合服后的区服名
     * uid 玩家uid 判断真正服
     * onlyQu 是否只返回区
     * zid 只返回区时传入合服后的服来判断
    */
    public getAfterMergeSeverName(uid?,onlyQu : boolean = false,zid : number = 0):string
    {
        if(!uid){
            uid = Api.playerVoApi.getPlayerID();
        }
        let trueZid = onlyQu ? zid : this.getTrueZid(uid);

        let str = '';
        if(this.isMergeSever(trueZid)){
            let newzoneid = this.mergeZidCfg[trueZid].split('-');
            if(onlyQu){
                str = LanguageManager.getlocal("mergeServerOnlyqu",[newzoneid[0]]);
            }
            else{
                str = LanguageManager.getlocal("mergeServer",[newzoneid[0],trueZid.toString()]);
            }
        }
        else{
            str = LanguageManager.getlocal("ranserver2",[trueZid.toString()]);
        }
        return str;
    }
    
    /**
     * 获取真正区服
    */
    public getTrueZid(uid?):number
    {
       if(!uid){
            uid = Api.playerVoApi.getPlayerID();
       }
       return Math.floor(uid / 1000000);;
    }

    public isInMergeZone()
    {
        return this.isMergeSever(this.getTrueZid());
    }
    /**
     * 判断是否同服
    */
    public judgeIsSameServer(zid1,zid2):boolean
    {
        let ismerge1 = this.isMergeSever(zid1);
        let ismerge2 = this.isMergeSever(zid2);
        if(ismerge1 && ismerge2){
            return this.mergeZidCfg[zid1] == this.mergeZidCfg[zid2];
        }
        else if(!ismerge1 && !ismerge2){
            return Number(zid1) == Number(zid2);
        }
        else{
            return false;
        }
    }

	public dispose():void
	{
        this.mergeZidCfg = null;
        super.dispose();
	}
}