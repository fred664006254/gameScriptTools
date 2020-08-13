/**
 * 内阁/议事院
 * author qianjun
 */
class CouncilView extends CommonView {
    public constructor() {
		super();
    }

    private _type : number = 1;//1参加时间 2结算间隔 3领赏时间
    private _timeDesc : BaseTextField = null;
    private _topbg : BaseBitmap = null;
    private _list : ScrollList = null;
    private _nodeContainer:BaseDisplayObjectContainer;

    protected getResourceList(): string[] {
		return super.getResourceList().concat([
            "story_npc_8","discussevent1bg","discussevent2bg","discussevent3bg","discussevent4bg","discussevent5bg","discusstopbg",
            "discussjzhoubottom","discussjzhoutop","activity_db_01","discussredbg",
        ]);
    }

    private get api(){
        return Api.councilVoApi;
    }

    protected getRuleInfo():string{
        return `councilRuleInfo`
    }

    protected initView():void{
        let view = this;
        view._type = view.api.getCurpeirod();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_COUNCIL_FRESHMODEL,view.freshList,view);
        
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_COUNCIL_GETREWARD,view.getRewardBack,view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_PALACE_GETCROSSPALACE,view.kingCallback,view);
        // NetManager.request(NetRequestConst.REQUEST_POLICY_INDEX, {});
        NetManager.request(NetRequestConst.REQUEST_PALACE_GETCROSSPALACE, {});
        NetManager.request(NetRequestConst.REQUEST_PALACE_GETPALACEINFO, {});
        
        this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

        let topbg = BaseBitmap.create(`discusstopbg`);
        topbg.y = -80;
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.titleBg, [0,view.titleBg.height - 50]);
        this._nodeContainer.addChild(topbg);
        view._topbg = topbg;

        // let man = BaseBitmap.create('story_npc_8');
        // man.setScale(0.6);
        // man.mask = new egret.Rectangle(0,0,man.width,man.height - 65);
        // view.setLayoutPosition(LayoutConst.leftverticalCenter, man, topbg);
        // view.addChild(man);

        let arrowBM = BaseBitmap.create("public_arrow");
        arrowBM.setPosition(topbg.x + 200,topbg.y + 100);
        arrowBM.visible = false;
        let descTxt = ComponentManager.getTextField(LanguageManager.getlocal('discussViewDescTxt'), 20, TextFieldConst.COLOR_BROWN);
        descTxt.width = 300;
        descTxt.lineSpacing = 5;
        view.setLayoutPosition(LayoutConst.leftverticalCenter, descTxt, arrowBM, [arrowBM.width + 20, 60]);
        this._nodeContainer.addChild(descTxt);
        
        let descbg = BaseBitmap.create(`public_9v_bg11`);//public_chatbg3 
        descbg.width   = descTxt.width + 40;
        descbg.height = descTxt.height + 70;
        // descbg.anchorOffsetX = descbg.width/2;
        descbg.scaleX = -1;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descbg, descTxt,[0,10]);
        this._nodeContainer.addChild(descbg);

        this._nodeContainer.addChild(arrowBM);
        this._nodeContainer.swapChildren(descbg, descTxt);

        let cdTimeTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._timeDesc = cdTimeTxt;
        this._nodeContainer.addChild(cdTimeTxt);

        let jzhoutop = BaseBitmap.create('discussjzhoutop');
        view.setLayoutPosition(LayoutConst.horizontalCentertop, jzhoutop, topbg, [0,topbg.height]);
        this._nodeContainer.addChild(jzhoutop);
        // this._nodeContainer.swapChildren(jzhoutop, topbg);

        let jzhoubottom = BaseBitmap.create('discussjzhoubottom');
        jzhoubottom.height = GameConfig.stageHeigth - jzhoutop.y - 30;
        jzhoubottom.width = GameConfig.stageWidth;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, jzhoubottom, jzhoutop, [0,-10]);
        this._nodeContainer.addChildAt(jzhoubottom,0);
        // this._nodeContainer.swapChildren(jzhoutop,jzhoubottom);

        let tmpRect =  new egret.Rectangle(0,0,580,GameConfig.stageHeigth - jzhoutop.y - 120);
        let scrollList = ComponentManager.getScrollList(CouncilItem,[],tmpRect);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, jzhoubottom, [5,40]);
        view._list = scrollList;   
        this._nodeContainer.addChild(scrollList);
        view.freshList();
        view.api.checkIsGetReward();
        this.tick();
        // this._nodeContainer.swapChildren(view.closeBtn, topbg);
    }

    private freshList():void{
        let view = this;
        view._list.refreshData(view.api.getTodayEvent());
    }

    protected getRequestData():{requestType:string,requestData:any}
	{ 
        return {requestType:NetRequestConst.REQUST_COUNCIL_GETEVENTINFO,requestData:{}};
    }

    private _playindex = 0;
    private _rewardarr : any = {};
    private getRewardBack(evt : egret.Event):void{
        let view = this;
        let data = evt.data.data.data;
        let arr = {};
        for(let i = 0; i < 5; ++ i){
            if(data[i]){
                arr[i] = data[i];
            }
        }
        view._playindex = 0;
        if(Object.keys(arr).length){
            view._rewardarr = null;
            view._rewardarr = arr;
            view.showReward();
        }
    }

    private showReward():void{
        let view = this;
        let keys = Object.keys(view._rewardarr);
        let data = view._rewardarr[keys[view._playindex]];
        if(data && data.servantData){
            ViewController.getInstance().openView(ViewConst.POPUP.COUNCILREWARDPOPUPVIEW, {
                eventId : keys[view._playindex],
                exp : data.exp,
                servantData : data.servantData,
                rank : data.myrank,
                confirmcallback : ()=>{
                    ++ view._playindex
                    view.showReward();
                },
                callobj : view,
                randevent : data.randevent,
            });
        }
        else{
            view.request(NetRequestConst.REQUST_COUNCIL_GETEVENTINFO,{});
        }
    }

    protected tick():void{
        let view = this;
        if(view.api.getCurpeirod() != view._type){
            view.request(NetRequestConst.REQUST_COUNCIL_GETEVENTINFO,{});
        }
        view._type = view.api.getCurpeirod();
        view._timeDesc.text = LanguageManager.getlocal(`discussViewCDTxt${view._type}`, [App.DateUtil.getFormatBySecond(view.api.getCountTime())]);
        view.setLayoutPosition(LayoutConst.rightbottom, view._timeDesc, view._topbg, [15,15]);
    }

    private kingCallback(evt : egret.Event):void{
        let view = this;
        view.api.setKingData(evt.data.data.data.palace["3201"]);
    }

    public dispose():void{
        let view = this;
        App.MessageHelper.removeEventListener(NetRequestConst.REQUST_COUNCIL_GETREWARD,view.getRewardBack,view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_COUNCIL_FRESHMODEL,view.freshList,view);
        App.MessageHelper.removeEventListener(NetRequestConst.REQUEST_PALACE_GETCROSSPALACE,view.kingCallback,view);
        view._timeDesc = null;
        view._topbg = null;
        view._type = 1;
        super.dispose();
    }
}