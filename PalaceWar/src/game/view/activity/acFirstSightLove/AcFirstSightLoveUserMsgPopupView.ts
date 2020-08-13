/**
 * 登记玩家信息
 * author ycg
 * date 2019.10.21
 * @class AcFirstSightLoveUserMsgPopupView
 */
class AcFirstSightLoveUserMsgPopupView extends PopupView 
{
    private _questionNumber:number = 4;
    private _list : ScrollList = null;

    private _chooseList:ChooseList = null;
    private _alphaBg:BaseBitmap = null;
    private _itemInfo:any = null;
    private _rewardBtn:BaseButton = null;

    public constructor() {
		super();
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "progress3","progress3_bg","emparena_bottom",
            "common_arrow_3","common_select_frame2",
        ]);
	}

    protected getTitleStr():string{
        return "acFirstSightLoveSignUpTitle";
    }
    protected getTitleBgName():string{
        return "";
    }

    protected getShowWidth():number{
        return 600;
    }

    protected getShowHeight():number{
        return 910;
    }

    private get vo():AcFirstSightLoveVo{
        return <AcFirstSightLoveVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

    public initView(): void 
    {
        let view = this;
        let bottomBg = BaseBitmap.create("public_9_bg21");
        bottomBg.width = 560-32;
        bottomBg.height = 670;
        bottomBg.setPosition(20+GameData.popupviewOffsetX, 0);

        let tip1 = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveSignUpTip1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        tip1.setPosition(bottomBg.x + bottomBg.width/2 - tip1.width/2, 8);
        view.addChildToContainer(tip1);

        let tip2 = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveSignUpTip2"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        tip2.width = bottomBg.width - 30;
        tip2.setPosition(bottomBg.x + bottomBg.width/2 - tip2.width/2, tip1.y + tip1.height + 8);
        view.addChildToContainer(tip2);

        bottomBg.y = tip2.y + tip2.height + 10;
        view.addChildToContainer(bottomBg);

        let rect = new egret.Rectangle(0, 0, bottomBg.width, bottomBg.height - 10);
        let list = ComponentManager.getScrollList(AcFirstSightLoveUserMsgItem, [1,3,4,5], rect, {o:this,f:this.showChooseList});
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, bottomBg, [0,5]);
        view.addChildToContainer(list);
        view._list = list;
        // list.setContentPosY(5);

        let rewardbtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acqacommit-1",this.clickButton,this );
        rewardbtn.setPosition(bottomBg.x + bottomBg.width/2 - rewardbtn.width/2, bottomBg.y + bottomBg.height + 10);
        view.addChildToContainer(rewardbtn);
        this._rewardBtn = rewardbtn;
    }

    private clickButton():void
    {   
        let view = this;
        let all = true;
        let answer2 : any = {};
        for(let i = 1; i <= this._questionNumber; ++ i){

            let item = <AcFirstSightLoveUserMsgItem>view._list.getItemByIndex(i - 1);
            if(item){
                let str = item.checkAnwser();
                if(str.answer){
                    answer2[str.name] = str.answer;
                }
                else{
                    all = false;
                    item.showEffect();
                    view._list.setScrollTopByIndex(str.index);
                    break;
                }
            }
        }
        if(all){
            let vo = <AcFirstSightLoveVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
            if (!vo.isInActivity()){
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            this._rewardBtn.setEnable(false);
            this.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BM,{activeId:this.vo.aidAndCode, username:answer2.name, birthday:answer2.birthday, tel:answer2.tel, email:answer2.email});
        }
        
    }

    protected receiveData(data: { ret: boolean, data: any }): void 
    {

        if (data.ret)
        {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACFIRSTSIGHTLOVE_FRESHVIEW);
            let vo = <AcFirstSightLoveVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
            egret.Tween.get(this._rewardBtn).call(()=>{
                App.CommonUtil.showTip(LanguageManager.getlocal("acFirstSightLoveSignUpSuccess"));
            }).wait(1000).call(()=>{
                this.hide();
            });
        }
        else{
            this._rewardBtn.setEnable(true);
        }
	}

    private getCompliteNumber():number
    {   
        let totalNum = 0;
        for(let i = 1; i <= this._questionNumber; ++ i){
            let item = <UserMsgItem>this._list.getItemByIndex(i - 1);
            if(item && item.getIsAnswer()){
                ++ totalNum;
            }
        }
        return totalNum;
    }

    private showChooseList(info:any):void
    {   
        this._itemInfo = info;
        let idx = info.index;
        //
        this._alphaBg = BaseBitmap.create("public_alphabg");
        this._alphaBg.width = GameConfig.stageWidth;
        this._alphaBg.height = GameConfig.stageHeigth;
        this.addChild(this._alphaBg);
        this._alphaBg.addTouchTap(this.clickChooseList,this);

        let keys:string[] = [];
        let startIdx = 1;
        let endIdx = 1;
        let w = 77;
        if (idx == 1)
        {
            startIdx = 1900;
            endIdx = 2019;
            w = 100;
        }
        else if (idx == 2)
        {
            endIdx = 12;
        }
        else if (idx == 3)
        {
            let year = Number(info.year);
            let m = Number(info.month);
            endIdx = GameData.getMonthDayByYearAndMonth(year,m);
        }

        for (let i = startIdx; i<= endIdx ; i++)
        {   
            if (i<10)
            {
                keys.push("0"+String(i));
            }
            else
            {
                keys.push(String(i));
            }
            
        }

        let clist = new ChooseList();
        clist.init(keys,w,this.chooseListCallback,this);
        let posy = 713- this._list.scrollTop - clist.height;
        clist.setPosition(info.x-3,posy);
        this.addChild(clist);
        this._chooseList = clist;
    }


    private clickChooseList(evt:egret.TouchEvent,parms:any):void
    {
        this._alphaBg.dispose();
        this._alphaBg = null;
        this._chooseList.dispose();
        this._chooseList = null;

        let f:Function = this._itemInfo.f;
        f.apply(this._itemInfo.o);

        this._itemInfo = null;
    }

    private chooseListCallback(str:string):void
    {
        this._alphaBg.dispose();
        this._alphaBg = null;
        this._chooseList.dispose();
        this._chooseList = null;

        let f:Function = this._itemInfo.f;
        f.apply(this._itemInfo.o,[str]);
        this._itemInfo = null;
    }

    public dispose()
	{   
        this._itemInfo = null;
        this._chooseList = null;
        this._alphaBg = null;
        this._rewardBtn = null;

		super.dispose();
	}
}