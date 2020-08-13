class CrossServerHegemonyVoApi extends BaseVoApi
{
    // private _crossServerHegemonyVo : AcCrossServerHegemonyVo;
    private _rqClickIdx = 0;
    private _rqClickType = "";

    private _scoreClickIdx = 0;
    private _scoreClickType = "";
    //每一场比赛时长
    private _matchTime = 60 * 60;
    //晋级赛的每日时间列表
    private _matchTimeList1 = [10 * 60 * 60, 16 * 60 * 60, 21 * 60 * 60];
    //淘汰赛比赛时间
    private _matchTimeList2 = [21 * 60 * 60];
    private _curData = null;
    private _flagRankData = null;
    private _mainSelectData = null;
    private _pkinfo:any = null;
    private _mainSearchDetail:boolean = false;
    private _myRank:any[] = null;
	public constructor() {
		super();
    }

    // public get cfg() : Config.AcCfg.CrossServerWipeBossCfg{
	// 	return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_CROSSSERVERWIPEBOSS, '1');
    // }
    public get cfg() : any{
        // return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_CROSSSERVERWIPEBOSS, '1');
        return null;
	}
	public dispose():void{
        // this._crossServerHegemonyVo = null;

        this._rqClickIdx = 0;
        this._rqClickType = '';

		super.dispose();
    }
    public setRank(rankData:any){
        this._myRank = rankData;
    }
    public getRank():any[]{
        return this._myRank;
    }

    public setMainSearchDetail(data:boolean){
        this._mainSearchDetail = data;
    }
    public getMainSearchDetail():any{
        return this._mainSearchDetail;
    }
    public setMainSelectData(data:any){
        this._mainSelectData = data;
    }
    public getMainSelectData():any{
        return this._mainSelectData;
    }
    public updateCurData(data:any)
    {   
        this._curData = data;
    }
    public getCurData():any
    {
        return this._curData;
    }
    public setPkinfo(d:any){
        this._pkinfo = d;
    }
    public getPkinfo(){
        return this._pkinfo;
    }
    public getDetailPkInfo(index:number):any[]
    {
        let data = this._pkinfo[index];
        if (data && data.length > 0){
            data.sort((a, b)=>{return a.maid - b.maid});
        }
        let obj = new Object();
        for(let i = 0; i < data.length; i ++){
            let d = data[i];
            if(!obj.hasOwnProperty(String(d["maid"]))){
                if(!obj.hasOwnProperty(String(d["taid"]))){
                    obj[d["maid"]] = {id1:String(d["maid"]),name1:d["mname"],win:-1,id2:String(d["taid"]),name2:d["tname"]};
                    if(Number(d["win"]) == 1){
                        obj[d["maid"]]["win"] = 1;
                    }
                } else {
                    if(Number(d["win"]) == 1){
                        obj[d["taid"]]["win"] = 2;
                    }
                }
            }
        }
        let returnList = [];
        for(let key in obj){
            returnList.push(obj[key]);
        }
        return returnList;
    }
    public setFlagRankData(data:any){
        this._flagRankData = data;
    }
    public getFlagRankData():any{
        return this._flagRankData;
    }
    public setFlagOnlyRankData(data:any[]){
        if(this._flagRankData){
            this._flagRankData.rank = data;
        }
    }
    public getMyInfo():any
    {
        if(this._curData && this._curData.info && this._curData.info.info && this._curData.info.info[Api.playerVoApi.getPlayerID()]){
            return this._curData.info.info[Api.playerVoApi.getPlayerID()];
        } else {
            return null;
        }
    }


    public getMatchTime():number
    {
        return this._matchTime;
    }
    
    public getMatchTimeList1():number[]
    {
        return this._matchTimeList1;
    }
    public getMatchTimeList2():number[]
    {
        return this._matchTimeList2;
    }

    public setRqClickIdx(type : string ,index : number):void{
        this._rqClickIdx = index;
        this._rqClickType = type;
    }

    public getRqClickIdx():number{
        return this._rqClickIdx;
    }

    public getRqClickType():string{
        return this._rqClickType;
    }

    public setScoreClickIdx(type : string ,index : number):void{
        this._scoreClickIdx = index;
        this._scoreClickType = type;
    }

    public getScoreClickIdx():number{
        return this._scoreClickIdx;
    }

    public getScoreClickType():string{
        return this._scoreClickType;
    }

}