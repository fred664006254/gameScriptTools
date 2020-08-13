/**
 * 新服预约 登录界面显示
 * author ycg
 * date 2020.6.29
 * @class AcNewappointPreviewView
 */
class AcNewappointPreviewView extends CommonView{
    private _aid:string = "newappoint";

    public constructor(){
        super();
    }

    protected getBgName():string{
        return null;
    }

    protected getTitleBgName():string{
        return null;
    }

    protected getTitleStr():string{
        return null;
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected isShowOpenAni():boolean{
        return false;
    }

    protected getCloseBtnName():string{
        return null;
    }

    protected get code():string{
		return Api.acnewappointApi.code ? Api.acnewappointApi.code : "";
    }

    protected get aid():string{
        return this._aid;
    }

    private getUiCode():string{
        return this.code;
    }

    private get cfg():Config.AcCfg.NewappointCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public initView():void{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACNEWAPPOINT_MODEL_REFRESH, this.refreshView, this);

        let bg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_bg", this.getUiCode()));
        bg.height = 760;
        this.addChildToContainer(bg);
        bg.setPosition(GameConfig.stageWidth/2 - bg.width/2, GameConfig.stageHeigth/2 - bg.height/2);

        let titleBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_previewtitlebg", this.getUiCode()));
        this.addChildToContainer(titleBg);
        titleBg.setPosition(bg.x + bg.width/2 - titleBg.width/2, bg.y - titleBg.height + 45);

        let closeBtn = ComponentManager.getButton(ButtonConst.POPUP_CLOSE_BTN_2, "", this.hide, this);
        closeBtn.x = bg.x + bg.width - closeBtn.width;
        closeBtn.y = bg.y - closeBtn.height/2 + 10;
        this.addChildToContainer(closeBtn);

        let hudieClip = ComponentManager.getCustomMovieClip("popupviewhudie", 10);
        hudieClip.x = closeBtn.x-45;
        hudieClip.y = closeBtn.y-45;
        hudieClip.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(hudieClip);
        hudieClip.playWithTime();

        let topBgImg = "acnewappoint_previewopentopbg";
        if (Api.acnewappointApi.isInActivity()){
            topBgImg = "acnewappoint_previewtopbg";
        }
        let topBg = BaseBitmap.create(App.CommonUtil.getResByCode(topBgImg, this.getUiCode()));
        topBg.setPosition(bg.x + bg.width/2 - topBg.width/2, bg.y + 43);
        this.addChildToContainer(topBg);

        let serverInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewServer", this.getUiCode()), [""+Api.acnewappointApi.getNewServer()]), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        serverInfo.setPosition(topBg.x + 297 + 60/2 - serverInfo.width/2, topBg.y + 46 + 36/2 - serverInfo.height/2);
        this.addChildToContainer(serverInfo);

        //tabbar
        let tabbarName = [App.CommonUtil.getCnByCode("acNewappointPreviewTab1", this.getUiCode()), App.CommonUtil.getCnByCode("acNewappointPreviewTab2", this.getUiCode())];
        let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN2_TAB, tabbarName, this.clickTabbarHandler, this);
        tabbarGroup.setSpace(0);
        tabbarGroup.setPosition(bg.x + 65, topBg.y + topBg.height - 13);
        this.addChild(tabbarGroup);
        this.tabbarGroup = tabbarGroup;   
        this.changeTab();
        this.refreshTabbar();

        this.refreshView();
    }

    private refreshTabbar():void{
        let tab = this.tabbarGroup.getTabBar(1);
        if (!Api.acnewappointApi.isJoin()){
            App.DisplayUtil.changeToGray(tab);
        }
        else{
            App.DisplayUtil.changeToNormal(tab);
        }
    }

    private refreshView():void{
        if (Api.acnewappointApi.isInActivity()){
            if (!Api.acnewappointApi.isJoin()){
                this.tabbarGroup.addRedPoint(0);
            }
            else{
                this.tabbarGroup.removeRedPoint(0);
            }
            if (Api.acnewappointApi.isJoin() && Api.acnewappointApi.checkTaskRed()){
                this.tabbarGroup.addRedPoint(1);
            }
            else{
                this.tabbarGroup.removeRedPoint(1);
            }
        }
        else{
            this.tabbarGroup.removeRedPoint(0);
            this.tabbarGroup.removeRedPoint(1);
        } 
        this.refreshTabbar();
    }

    protected checkTabCondition(index:number):boolean{
        if (index == 1){
            let tab = this.tabbarGroup.getTabBar(index);
            if (!Api.acnewappointApi.isJoin()){
                App.DisplayUtil.changeToGray(tab);
                if (Api.acnewappointApi.isInActivity()){
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewappointTip1", this.getUiCode())));
                }
                else{
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewappointTip2", this.getUiCode()))); 
                }
                return false;
            }
            App.DisplayUtil.changeToNormal(tab);
        }
        return true;
    }

    protected getTabbarGroupY():number{
        let offY = this.tabbarGroup.y + this.tabbarGroup.height - 2;
        return offY;
    }

    public getResourceList():string[]{
        let list:string[] = [];

        return super.getResourceList().concat([
            "itembg_0", "itembg_1", "itembg_2", "itembg_3", "itembg_4", "itembg_5", "itembg_6", "itembg_7","itembg_8","public_popupscrollitembg","shopview_itemtitle","public", "public_9_bg93", "button2","collectflag", "btn2_small_yellow",
            "acnewappoint_bg-1", "acnewappoint_gift1-1", "acnewappoint_gift2-1", "acnewappoint_gift3-1", "acnewappoint_giftbottombg-1",  "acnewappoint_giftitembg1-1", "acnewappoint_giftitembg2-1", "acnewappoint_previewtitlebg-1", "acnewappoint_previewtopbg-1", "acnewappoint_scoreitemicon-1", "acnewappoint_toptxtbg-1", "acnewappoint_previewopentopbg-1",
            "acnewappoint_bg-"+this.getUiCode(), "acnewappoint_gift1-"+this.getUiCode(), "acnewappoint_gift2-"+this.getUiCode(), "acnewappoint_gift3-"+this.getUiCode(), "acnewappoint_giftbottombg-"+this.getUiCode(),  "acnewappoint_giftitembg1-"+this.getUiCode(), "acnewappoint_giftitembg2-"+this.getUiCode(), "acnewappoint_previewtitlebg-"+this.getUiCode(), "acnewappoint_previewtopbg-"+this.getUiCode(), "acnewappoint_scoreitemicon-"+this.getUiCode(), "acnewappoint_toptxtbg-"+this.getUiCode(), "acnewappoint_previewopentopbg-"+this.getUiCode(),
        ]).concat(list);
    }

    public dispose():void{
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACNEWAPPOINT_MODEL_REFRESH, this.refreshView, this);
        this._aid = null;

        super.dispose();
    }
}