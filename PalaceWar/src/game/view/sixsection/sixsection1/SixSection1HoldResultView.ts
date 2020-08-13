/**
* 据点结算
* date 2020.5.13
* author ycg
* @name SixSection1HoldResultView
*/
class SixSection1HoldResultView extends CommonView{
    private _baseContent:BaseDisplayObjectContainer = null;

    public constructor() {
        super();
    }

    protected getBgName():string{
        return "";
    }

    protected getTitleStr():string{
        return null;
    }

    protected getTitleBgName():string{
        return "";
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getRuleInfo():string{
        return ""
    }

    protected getProbablyInfo():string{
        return ""
    }

    protected getCloseBtnName():string
	{	
		if (this.uiType == "2")
		{
			return ButtonConst.POPUP_CLOSE_BTN_2;
		}
		return ButtonConst.POPUP_CLOSE_BTN_1;
	}

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            "public_scrollitembg","specialview_artbg",
        ).concat(list);
    }

    public initView():void{
        let baseContent = new BaseDisplayObjectContainer();
        this.addChildToContainer(baseContent);
        this._baseContent = baseContent;

        let titleBg = BaseBitmap.create("specialview_artbg");
        titleBg.setPosition(GameConfig.stageWidth/2 - titleBg.width/2, 0);

        let title = BaseBitmap.create("sixsection1_spointresult_titletxt");
        title.setPosition(GameConfig.stageWidth/2 - title.width/2, titleBg.y + titleBg.height/2- title.height/2);

        let bg = BaseBitmap.create("sixsection1_spointresult_topbg");
        bg.setPosition(GameConfig.stageWidth/2 - bg.width/2, title.y + title.height/2 + 12);

        let dataList = Api.sixsection1VoApi.getResultSeat();
        // console.log("SixSection1HoldResultView ", dataList);

        let scrollList = ComponentManager.getScrollList(SixSection1HoldResultScrollItem, dataList, new egret.Rectangle(0, 0, GameConfig.stageWidth, 500), {});
        scrollList.setPosition(0, bg.y + bg.height - 15);
        baseContent.addChild(scrollList);
        scrollList.horizontalScrollPolicy = "off";
        scrollList.bounces = false;

        baseContent.addChild(bg);
        baseContent.addChild(titleBg);
        baseContent.addChild(title);

        let totalGetCount = 0;
        let noGetCount = 0;
        let getResCount = 0;
        let loseResCount = 0;
        for (let i=0; i < dataList.length; i++){
            if (dataList[i].type == "build"){
                totalGetCount += 1;
                if (dataList[i].status == 1){
                    noGetCount += 1;
                    loseResCount += dataList[i].data.fres;
                }
                getResCount += dataList[i].data.res;
            }
        }
        console.log("datalist ",dataList);
        App.LogUtil.log("totalGetCount "+ totalGetCount + " notGetCount "+noGetCount + " resNum "+getResCount);

        //资源获取信息
        //已采集据点
        let getNum = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldResultSeatGet", [""+(totalGetCount - noGetCount)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        getNum.setPosition(bg.x + 70, bg.y + 50);
        baseContent.addChild(getNum);
        //被抢夺据点
        let notGetNum = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldResultSeatNotGet", [""+noGetCount]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        notGetNum.setPosition(bg.x + bg.width/2 + 40, bg.y + 50);
        baseContent.addChild(notGetNum);

        //总计资源
        let totalTitle = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldResultSeatTotalInfo"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        totalTitle.setPosition(bg.x + 70, getNum.y + getNum.height + 15 + 5);
        baseContent.addChild(totalTitle);

        //总获得资源
        // let totalGetBg = BaseBitmap.create("sixsection1_resultinfobg");
        // baseContent.addChild(totalGetBg);
        let totalGet = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldResultSeatTotalGet"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        // totalGetBg.width = totalGet.width + 100;
        // totalGetBg.setPosition(totalTitle.x - 20, totalTitle.y + totalTitle.height + 10);
        totalGet.setPosition(totalTitle.x, totalTitle.y + totalTitle.height + 20);
        baseContent.addChild(totalGet);

        let totalGetInfoStr = LanguageManager.getlocal("sixSection1HoldSeatResName1")+"*"+getResCount;
        let totalGetInfo = ComponentManager.getTextField(totalGetInfoStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        totalGetInfo.setPosition(totalGet.x + totalGet.width, totalGet.y);
        baseContent.addChild(totalGetInfo);
        // totalGetInfo.width = GameConfig.stageWidth - totalGet.x - totalGet.width - 10;
        // totalGetInfo.lineSpacing = 5;

        // totalGetBg.width = totalGet.width + totalGetInfo.width + 60;
        // totalGetBg.setPosition(totalTitle.x - 30, totalTitle.y + totalTitle.height + 10);

        //被抢夺资源资源
        // let notGetBg = BaseBitmap.create("sixsection1_resultinfobg");
        // baseContent.addChild(notGetBg);
        let notGet = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldResultSeatTotalNotGet"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED3);
        // notGetBg.width = notGet.width + 100;
        // notGetBg.setPosition(totalGetInfo.x - 20, totalGetInfo.y + totalGetInfo.height + 25);
        notGet.setPosition(totalTitle.x, totalGetInfo.y + totalGetInfo.height + 17 + 10 - 5);
        baseContent.addChild(notGet);

        let notGetInfoStr = LanguageManager.getlocal("sixSection1HoldSeatResName1")+"*"+loseResCount;
        let notGetInfo = ComponentManager.getTextField(notGetInfoStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED3);
        notGetInfo.setPosition(notGet.x + notGet.width, notGet.y);
        baseContent.addChild(notGetInfo);
        // notGetInfo.width = GameConfig.stageWidth - notGet.x - notGet.width - 10;
        // notGetInfo.lineSpacing = 5;
        // notGetBg.width = notGet.width + notGetInfo.width + 60;
        // notGetBg.setPosition(notGet.x - 30, totalGetInfo.y + totalGetInfo.height + 17 - 5);

        let dataLen = dataList.length;
        if (dataLen < 4){
            baseContent.y = (GameConfig.stageHeigth - bg.y - bg.height + 15 - dataLen * 127 + 5)/2 - 20;
        }
        else{
            baseContent.y = (GameConfig.stageHeigth - scrollList.y - scrollList.height)/2 - 20;
        }
        this.closeBtn.y = baseContent.y + 30;
    }

    public hide():void{
        //调接口
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_SHOW, {show: 1});
        super.hide();
    }

    public dispose():void{
        this._baseContent = null;
        super.dispose();
    }
}