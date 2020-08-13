/**
 * 登记玩家信息
 * @author shaoliang
 * date 2019/9/29
 * @class UserMsgView
 */
class UserMsgView extends CommonView 
{

    private _progressTxt : BaseTextField = null;
    private _progress : ProgressBar = null;

    private _questionNumber:number = 5;
    private _list : ScrollList = null;

    private _chooseList:ChooseList = null;
    private _alphaBg:BaseBitmap = null;

    private _itemInfo:any = null;

    public constructor() {
		super();
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "usermsg_descbg","usermsg_title","progress3","progress3_bg","emparena_bottom",
            "common_arrow_3","common_select_frame2",
        ]);
	}

    protected getTitleStr():string{
        return null;
    }
    protected getTitleBgName():string{
        return "usermsg_title";
    }

    public initView(): void 
    {
        let view = this;
        let topBg = BaseBitmap.create("usermsg_descbg");
        this.addChild(topBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view.titleBg, [0,view.titleBg.height - 10]);

        let descbg = BaseBitmap.create("public_9_downbg");
        descbg.width = 426;
        descbg.height = 134;
        descbg.setPosition(210,topBg.y+22);
        this.addChild(descbg);

        let desc = ComponentManager.getTextField(LanguageManager.getlocal("usermsg_desc"),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        desc.width = 396;
        desc.lineSpacing = 5;
        desc.setPosition(descbg.x+descbg.width/2-desc.width/2,descbg.y+12);
        this.addChild(desc);

        let bottomBg = BaseLoadBitmap.create("servant_bottombg");
        bottomBg.y = topBg.y+topBg.height-4;
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.height = GameConfig.stageHeigth - bottomBg.y - 84;
		this.addChild(bottomBg); 

        let downbg = BaseBitmap.create("emparena_bottom");
        downbg.height = 86;
        downbg.setPosition(0,GameConfig.stageHeigth-86);
        this.addChild(downbg);

        let progress = ComponentManager.getProgressBar("progress3","progress3_bg",550);
        progress.setPercentage(0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progress, bottomBg, [45,40]);
        view.addChild(progress);
        this._progress = progress;

        let progressTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acqaquestionjindu-1`, ['0',this._questionNumber.toString()]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progressTxt, progress, [2,-4-progressTxt.textHeight]);
        view.addChild(progressTxt);
        this._progressTxt = progressTxt;

        let rect = new egret.Rectangle(0, 0, 585, bottomBg.height - 95);
        let list = ComponentManager.getScrollList(UserMsgItem, [1,2,3,4,5], rect,{o:this,f:this.showChooseList});
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, bottomBg, [0,78]);
        view.addChild(list)
        view._list = list;
        list.setContentPosY(6);

        let rewardbtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acqacommit-1",this.clickButton,this );
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rewardbtn, downbg, [0,0]);
        view.addChild(rewardbtn);

        view.setChildIndex(view.titleBg, 9999);
        view.setChildIndex(view.closeBtn, 9999);

        let blossomIcon = App.DragonBonesUtil.getLoadDragonBones("acwelcome_blossom");
        // blossomIcon.anchorOffsetX = blossomIcon.width / 2;
        blossomIcon.x = 80;
        blossomIcon.y = 170;
        this.addChildToContainer(blossomIcon);

    }

    private clickButton():void
    {   
        let view = this;
        let all = true;
        let answer2 : any = {};
        for(let i = 1; i <= this._questionNumber; ++ i){

            let item = <UserMsgItem>view._list.getItemByIndex(i - 1);
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
            this.request(NetRequestConst.REQUEST_OTHERINFO_SENDUSERMSG,{userMsg:answer2});
        }
        
    }

    protected receiveData(data: { ret: boolean, data: any }): void 
    {

        if (data.ret)
        {
            // let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
            // App.CommonUtil.playRewardFlyAction(rewardList);

            App.CommonUtil.showTip(LanguageManager.getlocal("usermsg_complete"));

            this.hide();
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

    public tick():void{
        let view = this;
        let totalNum = this.getCompliteNumber();
        view._progressTxt.text = LanguageManager.getlocal(`acqaquestionjindu-1`, [totalNum.toString(),this._questionNumber.toString()]);
        view._progress.setPercentage(totalNum / this._questionNumber);
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
        let view = this;
        view._progressTxt = null;
        view._progress = null;
        this._itemInfo = null;

        this._chooseList = null;
        this._alphaBg = null;

		super.dispose();
	}
}