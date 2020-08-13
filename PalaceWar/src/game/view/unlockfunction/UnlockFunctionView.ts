/**
 * 功能解锁展示
 * author ycg
 * date 2020.6.19
 * @class UnlockFunctionView
 */
class UnlockFunctionView extends BaseView{
    private _tip:BaseTextField = null;
    private _light1:BaseBitmap = null;
    private _light2:BaseBitmap = null;
    private _iconContainer:BaseDisplayObjectContainer = null;
    private _data:any = null;

    public constructor(){
        super();
    }

    public getTitleBgName():string{
        return null;
    }

    public getBgName():string{
        return null;
    }

    public getTitleStr():string{
        return null;
    }

    public getCloseBtnName():string{
        return null;
    }

    protected getRequestData():{requestType:string,requestData:any}
	{	
        let id = this.param.data.data.data.id;
		return {requestType:NetRequestConst.REQUEST_OPENFUNCTION_UNLOCKLIST2,requestData:{
			unlockKey : id,
		}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if (data.ret){
            let id = this.param.data.data.data.id;
            Api.unlocklist2VoApi.setShowBase(""+id);
        }
	}

    public initView():void{
        this._maskBmp.alpha = 0;
        this._data = this.param ? this.param.data.data : null;
        console.log("initView ",this._data);
        let nodeContainer = new BaseDisplayObjectContainer();
        nodeContainer.width = GameConfig.stageWidth;
        nodeContainer.height = GameConfig.stageHeigth;
        this.addChildToContainer(nodeContainer);

        let mask = BaseBitmap.create("public_9_viewmask");
        mask.width = nodeContainer.width;
        mask.height = nodeContainer.height;
        nodeContainer.addChild(mask);

        //光
        let light1 = BaseBitmap.create("public_rotatelight");
        nodeContainer.addChild(light1);
        light1.anchorOffsetX = light1.width/2;
        light1.anchorOffsetY = light1.height/2;
        light1.setPosition(nodeContainer.width/2, nodeContainer.height/2);
        egret.Tween.get(light1, {loop: true}).to({rotation: -360}, 2000);
        this._light1 = light1;

        // let light2 = BaseBitmap.create("public_rotatelight");
        // nodeContainer.addChild(light2);
        // light2.anchorOffsetX = light2.width/2;
        // light2.anchorOffsetY = light2.height/2;
        // light2.setPosition(nodeContainer.width/2, nodeContainer.height/2);
        // egret.Tween.get(light2, {loop: true}).to({rotation: 360}, 2000);
        // this._light2 = light2;

        //点击提示
        let tip = ComponentManager.getTextField(LanguageManager.getlocal("clickToClose"), TextFieldConst.FONTSIZE_CONTENT_SMALL ,TextFieldConst.COLOR_WHITE);
        nodeContainer.addChild(tip);
        tip.setPosition(nodeContainer.width/2 - tip.width/2, light1.y + light1.height/2);
        egret.Tween.get(tip, {loop: true}).to({alpha: 0}, 500).to({alpha: 1}, 500);
        tip.visible = false;
        this._tip = tip;

        //缩放出现图标文字
        let iconContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(iconContainer);
        this._iconContainer = iconContainer;
        if (this._data.isHome){
            let icon = BaseLoadBitmap.create(this._data.icon);
            icon.width = this._data.iconW;
            icon.height = this._data.iconH;
            iconContainer.width = icon.width;
            iconContainer.height = icon.height;
            iconContainer.addChild(icon);
            if (this._data.scrollX > -1){
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHECK_FUNCTION_CITYSCENE_SCROLL, {data: this._data});
            }
        }
        else{
            let icon = BaseBitmap.create(this._data.icon);
            iconContainer.width = icon.width;
            iconContainer.height = icon.height;
            iconContainer.addChild(icon);
            if (this._data.iconStr){
                let iconTxt = ComponentManager.getTextField(LanguageManager.getlocal(this._data.iconStr), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_TABBAR);
                iconTxt.setPosition(icon.x + icon.width/2 - iconTxt.width/2, icon.y + icon.height/2 - iconTxt.height/2);
                iconContainer.addChild(iconTxt);
            }
        }
        iconContainer.anchorOffsetX = iconContainer.width/2;
        iconContainer.anchorOffsetY = iconContainer.height/2;
        iconContainer.setPosition(GameConfig.stageWidth/2, GameConfig.stageHeigth/2);
        iconContainer.setScale(0.2);

        egret.Tween.get(iconContainer).to({scaleX: 1, scaleY: 1}, 500).wait(1000).call(()=>{
            tip.visible = true;
            mask.addTouchTap(()=>{
                nodeContainer.visible = false;
                nodeContainer.dispose();
                this.playMoveAni();
            }, this);
        });
    }

    private playMoveAni():void{
        if (this._data.isHome){
            let desX = this._data.iconX - this._data.scrollX + this._iconContainer.width/2;
            let desY = GameConfig.stageHeigth - this._data.sceneHeight + this._data.iconY + this._iconContainer.height/2;
            egret.Tween.get(this._iconContainer).to({x: desX, y: desY}, 400).call(()=>{
                Api.unlocklist2VoApi.clearBaseId();
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHECKNPC_SHOW,{"key": this._data.data.gameName});
                this.hide();;
            })
        }
        else{
            let desX = this._data.iconX + this._iconContainer.width/2;
            let desY = this._data.iconY + this._iconContainer.height/2;
            egret.Tween.get(this._iconContainer).to({x: desX, y: desY}, 400).call(()=>{
                Api.unlocklist2VoApi.clearBaseId();
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN, {"key": this._data.data.gameName});
                this.hide();
            })
        }
    }

    protected getResourceList():string[]{
        return super.getResourceList().concat([
            "public_rotatelight", "mainui_friends_btn", "player_tab2","player_tab4"
        ])
    }

    public dispose():void{
        if (this._tip){
            egret.Tween.removeTweens(this._tip);
        }
        if (this._light1){
            egret.Tween.removeTweens(this._light1);
        }
        if (this._light2){
            egret.Tween.removeTweens(this._light2);
        }
        if (this._iconContainer){
            egret.Tween.removeTweens(this._iconContainer);
        }
        this._tip = null;
        this._light1 = null;
        this._light2 = null;
        this._iconContainer = null;
        // this._data = null;
        super.dispose();
        if (this._data.type){
            App.LogUtil.log("this._data.type "+this._data.type);
            Api.unlocklist2VoApi.checkWaitingShowInFunc(this._data.type);
        }
    }
}