/**
 * 府内功能
 */
class MainUIHouseFuncBtnView extends BaseDisplayObjectContainer{
    private _zhenqifangBtn:BaseButton = null;
    private _changeBgBtn:BaseButton = null;
    private _friendsBtn:BaseButton = null;
    private _btnList:BaseButton[] = [];
    private _bg:BaseBitmap = null;
    private _paramData:any = null;

    public constructor(param?:any) {
        super();
        this._paramData = param;
        this.init();
    }
    
    public init():void{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN, this.freshBtn, this);
        let bg = BaseBitmap.create("mainui_houseBtnbg");
        this.addChild(bg);
        this._bg = bg;
        if (this._paramData){
            bg.addTouchTap(()=>{
                this._paramData.callback.apply(this._paramData.obj);
            }, this);
        }
        else{
            bg.touchEnabled = true;
        }

        //珍器房
        let offX = 20;
        let offY = 20;
        let offW = 86;
		if((!Api.unlocklist2VoApi.checkShowOpenFunc() && Api.switchVoApi.checkZhenQiFangOpen()) || (Api.unlocklist2VoApi.checkShowOpenFunc() && Api.switchVoApi.checkZhenQiFangOpen() && Api.zhenqifangVoApi.isShowNpc())){
			this._zhenqifangBtn = ComponentManager.getButton("zhenqifangenter",null, this.openZhenqifang,this,null,1);
			this._zhenqifangBtn.setPosition(offX, offY);
			this.addChild(this._zhenqifangBtn);
			this.checkZhenQiFangState();
            this._btnList.push(this._zhenqifangBtn);
            offX = this._zhenqifangBtn.x + offW;
        }

        if(Api.switchVoApi.checkOpenChangeBg() && Config.SceneCfg.isSceneMulti()){
            this._changeBgBtn = ComponentManager.getButton("mainui_changebg_btn",null, this.openChangeBg,this,null,1);
			this._changeBgBtn.setPosition(offX, offY);
			this.addChild(this._changeBgBtn);
			this.checkChangeBgState();
            this._btnList.push(this._changeBgBtn);
            offX = this._changeBgBtn.x + offW;
        }
        
        if (Api.unlocklist2VoApi.checkShowOpenFunc()) {
            if (Api.friendVoApi.isShowNpc() && (!Api.unlocklist2VoApi.isInNeedShowEffect("friend")) || this._paramData.isOpenFunc){
                this.showFriend(offX, offY);
                if (this._paramData.isOpenFunc){
                    this._friendsBtn.visible = false;
                }
            }
        }
        else{
            this.showFriend(offX, offY);
        }
        
        bg.width = this._btnList.length * offW + 30;
        bg.height = 134;
        this.width = bg.width;
        this.height = bg.height;

        TickManager.addTick(this.tick, this);
    }

    private showFriend(x:number, y:number):void{
        this._friendsBtn = ComponentManager.getButton("mainui_friends_btn","",this.openFriends,this,null,1);
        this._friendsBtn.x = x;
        this._friendsBtn.y = y;
        this.addChild(this._friendsBtn);
        if(Api.friendVoApi.isShowNpc()){
            this._friendsBtn.setGray(false);
        }
        else
        {
            this._friendsBtn.setGray(true);
        }
        this._btnList.push(this._friendsBtn);
        this.checkFriendsState();
    }

    private freshBtn(evt:egret.Event):void{
        let data = evt.data;
        if (data.key == "friend"){
            this._friendsBtn.visible = true;
        }
    }

    private resetBtnPos():void{
        let offW = 86;
        let offX = 20;
        for (let i=0; i < this._btnList.length; i++){
            let btn = this._btnList[i];
            if (btn && btn.visible){
                btn.x = offX + i * offW;
            }
        }
        this._bg.width = this._btnList.length * offW + 30;
        this._bg.height = 134;
    }

    private tick():void{
        this.checkZhenQiFangState();
        this.checkFriendsState();
        this.checkChangeBgState();
    }

    //珍器坊
    private openZhenqifang():void{
        if(Api.rookieVoApi.isGuiding && Api.rookieVoApi.curStep == "102"){
			return;
		}
		if(Api.zhenqifangVoApi.isShowNpc()){
			ViewController.getInstance().openView(ViewConst.COMMON.ZHENQIFANGVIEW);
		}
		else{
			App.CommonUtil.showTip(LanguageManager.getlocal("reachLvelUnlockDesc",[Api.playerVoApi.getPlayerOfficeByLevel(Config.ServantweaponCfg.lvNeed)]));
		}
    }

    //切换场景
    private openChangeBg():void{
        if(Api.rookieVoApi.isGuiding)
		{
			return;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.CHANGEBGVIEW);
    }

    //好友
    private openFriends():void{
        if(!Api.friendVoApi.isShowNpc())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("mianUIFriendBtnTip",[LanguageManager.getlocal("officialTitle" + GameConfig.config.friendCfg.needLv)]));
			return;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.FRIENDSVIEW);
    }

    //珍器坊
    private checkZhenQiFangState():void{
		if(this._zhenqifangBtn){
			if(Api.zhenqifangVoApi.isShowNpc()){
				this._zhenqifangBtn.setGray(false);
				if(Api.zhenqifangVoApi.checkNpcMessage()){
					App.CommonUtil.addIconToBDOC(this._zhenqifangBtn);
					let reddot = this._zhenqifangBtn.getChildByName("reddot");
					reddot.x = 51;
					reddot.y =  10;
				}
				else
				{
					App.CommonUtil.removeIconFromBDOC(this._zhenqifangBtn);
				}
			}
			else{
				this._zhenqifangBtn.setGray(true);
			}
		}
	}

    //场景
	private checkChangeBgState():void
	{
		if (this._changeBgBtn)
		{
			if (Api.otherInfoVoApi.isHasSceneRedot())
			{
				App.CommonUtil.addIconToBDOC(this._changeBgBtn);
				let reddot = this._changeBgBtn.getChildByName("reddot");
				reddot.x = 51;
				reddot.y =  10;
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(this._changeBgBtn);
			}
		}
    }
    
    //好友
    private checkFriendsState():void{
        if(this._friendsBtn && Api.friendVoApi.isShowNpc())
		{
			this._friendsBtn.setGray(false);
			if( Api.friendVoApi.isShowRedForEnter() ){
				App.CommonUtil.addIconToBDOC(this._friendsBtn);
				let reddot = this._friendsBtn.getChildByName("reddot");
				reddot.x = 51;
				reddot.y =  10;
			}else{
				App.CommonUtil.removeIconFromBDOC(this._friendsBtn);
			}
		}
    }

    public hide():void{
        this.dispose();
    }

    public dispose():void{
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN, this.freshBtn, this);
        TickManager.removeTick(this.tick, this);
        this._zhenqifangBtn = null;
        this._changeBgBtn = null;
        this._friendsBtn = null;
        this._btnList = [];
        this._bg = null;
        this._paramData = null;

        super.dispose();
    }

}
