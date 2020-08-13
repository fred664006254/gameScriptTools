/**
 * 风华群芳  历史排行榜
 */
class AcGroupWifeBattleHistoryRankView extends CommonView
{    
    private _tabHeight = 0;
    private _pranklist = [];
    private _zranklist = [];
    public constructor() {
		super();
    }
    
    private get cfg() : Config.AcCfg.GroupWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }
    private get vo() : AcGroupWifeBattleVo{
        return <AcGroupWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }
    private get code() : string{
        return String(this.param.data.code);
    }

    private get aid() : string{
        return String(this.param.data.aid);
    }

    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
    }

      protected getUiCode() : string{
        let code = ``;
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }

    protected getTabbarTextArr():Array<string>{
        let code = this.getUiCode();
		return [`acPunishRankRewardTab1`, 
                `acPunishRankRewardTab2`,
		];
    } 

   	protected getRuleInfo() : string{	
        if(Api.switchVoApi.checkServantRefuseBattle() && this.getUiCode() == '1' &&Api.switchVoApi.checkOpenAtkracegChangegpoint()){
			return "acBattleRoundRule-1_newRule_withOpenRefusal";
		}
        return Api.switchVoApi.checkOpenAtkracegChangegpoint() ? (`acBattleRoundRule-${this.getUiCode()}_newRule`) : (`acBattleRoundRule-${this.getUiCode()}`);
    }
    
    protected getRuleInfoParam() : string[]{
        return this.vo.getRuleInfoParam();
    } 
    
    protected getTitleStr() : string{
        return `achistoryRank`;
    }

    public get tabHeight():number{
        let view = this;
        return  view._tabHeight;
    }

    public get tabWidth():number{
        let view = this;
        return view.width;
    }

    public getHistoryPrankList():any[]{
        let view = this;
        let arr = [];
        /*
        	"battlestaut1":"晋级",
	"battlestaut2":"淘汰",
	"battlestaut3":"已淘汰",
        */
        for(let i in this._pranklist){
            let unit = this._pranklist[i];
            let status = unit.alive ? (unit.rise ? 1 : 2) : (3);
            arr.push({
                myrank : Number(i) + 1,
                name : unit.name,
                alliname : unit.gname,
                value : unit.value,
                status : status,
                uid : unit.uid
            });
        }
        return  arr;
    }

    public getHistoryArankList():any[]{
        let view = this;
        let arr = [];
        for(let i in this._zranklist){
            let unit = this._zranklist[i];
            let status = unit.rjoin == 0 ? (3) : (unit.rise > 0 ? 1 : 2);
            arr.push({
                myrank :  Number(i) + 1,
                alliname : unit.name,
                zid : unit.zid,
                num1 : unit.rjoin ? unit.rjoin : 0,
                num2 : unit.rise ? unit.rise : 0,
                status : status,
                id : unit.id,
            });
        }
        return  arr;
    }

    protected getRequestData(): { requestType: string, requestData: any } {
        return { requestType: NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETRANK, 
            requestData: {
                activeId : this.param.data.aid+"-"+this.param.data.code, 
                needround : this.param.data.round
            } 
        };
	}
	protected receiveData(data: { ret: boolean, data: any }): void {
		if(data.ret){
			if(data.data.data){
                this._pranklist = data.data.data.rankArr;//个人排行
                this._zranklist = data.data.data.allirankArr;//帮会排行
            }
        }
    }
    
	public initView():void{
        let view = this;
        let data = view.param.data.data;
        let round = view.param.data.round;
    	let topbg = BaseBitmap.create("battletabbg"); 
		topbg.setPosition(0,view.titleBg.height+view.titleBg.y);
        view.addChild(topbg);
        
        view.setChildIndex(view.tabbarGroup, 9999);
        view.tabbarGroup.y -= 5;

        let listbg = BaseBitmap.create(`battlerankbg`);
        listbg.width = GameConfig.stageWidth;
        listbg.height = GameConfig.stageHeigth - 65 - view.tabbarGroup.y - view.tabbarGroup.height;
        listbg.y = -5;
        view.addChildToContainer(listbg);
        view._tabHeight = listbg.height;

        let time1 : string  = App.DateUtil.getFormatBySecond(view.vo.versionst,10);
		var nextSt = this.vo.versionst + data.time;
		let time2 : string  =  App.DateUtil.getFormatBySecond(nextSt,10);
        
        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBattleTimeend5",[time1,time2,round]), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, listbg, [0,10]);
        view.addChildToContainer(tipTxt);

        view.setChildIndex(view.closeBtn, 9999);
    }   

    protected getResourceList():string[]{
        let code = this.code;
		return super.getResourceList().concat([
            `arena_bottom`
        ]);
    } 
    
	public dispose():void{
        let view = this
        this.vo.flag = false;
        view._tabHeight = 0;
        super.dispose();
    }
}