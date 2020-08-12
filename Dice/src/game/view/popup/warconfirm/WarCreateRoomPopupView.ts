/**
 * 创建房间
 * author qianjun
 * 
 */
class WarCreateRoomPopupView extends PopupView{

	private _end = false;
	private _roomTxt : BaseTextField = null;
	private _tipTxt : BaseTextField = null;
	private _showLoading : BaseBitmap = null;
	private _inputbg : BaseBitmap = null;
	private _iswait : boolean = false;

	public constructor() {
		super();
	}
	
	protected getNetConstEventArr():string[]{
		return [
            NetConst.BATTLE_FINDFRIEND
		];
	}

	protected netEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case NetConst.BATTLE_FINDFRIEND:
                view.findResult(evt);
                break;
        }
    }

	// 打开该面板时，需要传参数msg
	public initView():void{
        let view = this;
        let param = view.param.data;
        //type 1对战 2协同
        let type = param.type;
    }

    protected clickCancelHandler(data:any):void{
		let param = this.param;
        this._end = true;
		if(param.data.cancelcallback){
			param.data.cancelcallback.apply(param.data.handler,[this]);
		}
		if(this._iswait){
			NetManager.request(NetConst.BATTLE_CANCELFINDFRIEND,{
				findType: param.data.type,
			});
		}
		this.hide();
	}

	protected isTouchMaskClose():boolean{
		return false;
    }

    protected getTitleStr(){
        let param = this.param.data;
		return LangMger.getlocal(`warwaitng2`);
	}
	
	// protected getCloseBtnName():string{
    //     return `popupview_closebtn${this.isWave ? `purple` : `red`}`;
	// }
	
	protected closeHandler(){
        let param = this.param;
        this._end = true;
        if(param.data.cancelcallback){
			param.data.cancelcallback.apply(param.data.handler,[this]);
		}
		if(this._iswait){
			NetManager.request(NetConst.BATTLE_CANCELFINDFRIEND,{
				findType: param.data.type,
			});
		}
		super.closeHandler();
    }
    
    // protected getShowWidth():number{
	// 	return 552;
	// }

	protected getShowHeight():number{
		return 365;
	}

	public hide(){		
		super.hide()
	}

	protected getResourceList():string[]{	
		let array:string[] = [];
		array.concat(super.getResourceList())
		return array.concat([
			`joinwarinputbg`,`joinwarcopy` 
		]);
	}

	protected getParent():egret.DisplayObjectContainer{
		if(this.param.data.inLayer){
			return this.param.data.inLayer;
		} 
		else{
			return super.getParent();
		}
	}

	protected resetBgSize():void{
        let view = this;
        view._end = false;
        view.viewBg.width = this.getShowWidth();
        view.viewBg.height = this.getShowHeight();
		super.resetBgSize();
	
        let param = view.param.data;
        //type 1对战 2协同
        let type = param.type;

        // let titlebg = BaseBitmap.create(`public_poptittle${type == 1 ? `red` : `purple`}`);
        // view.addChildAt(titlebg, view.getChildIndex(view.titleTF));
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titlebg, view.viewBg);

        // view.closeBtn.x = PlatMgr.hasSpcialCloseBtn()? 0 : (view.viewBg.x + view.viewBg.width - view.closeBtn.width-17);
        // view.closeBtn.y = this.viewBg.y+10;

        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.titleTF, titlebg);
		// if(view._line){
        //     view._line.visible = false;
        // }

        let inputbg = BaseBitmap.create(`joinwarinputbg`);
        // let inputTextfield = ComponentMgr.getInputTextField(,);
        inputbg.width = 420;
        inputbg.height = 50;
        view.addChildToContainer(inputbg);
        inputbg.x = (view.viewBg.width - inputbg.width) / 2;
		inputbg.y = 15;
		view._inputbg = inputbg;

		let roomTxt = ComponentMgr.getTextField(`1`, TextFieldConst.SIZE_CONTENT_SMALL_POPUP, ColorEnums.white);
		view.addChildToContainer(roomTxt);
		roomTxt.bold = true;
        roomTxt.stroke = 1.5;
        roomTxt.strokeColor = ColorEnums.black;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, roomTxt, inputbg);
		view._roomTxt = roomTxt;
		roomTxt.visible = false;

		let copyBtn = ComponentMgr.getButton(`joinwarcopy`, ``, ()=>{
			//拷贝
			if(PlatMgr.checkIsUseSDK()){
                RSDK.copyToClipboard(roomTxt.text);
            }
            else{
                let input = document.createElement("input");
                input.value = roomTxt.text;
                input.readOnly = true;
                document.body.appendChild(input);
                input.select();
                input.setSelectionRange(0, input.value.length),
                document.execCommand('Copy');
                document.body.removeChild(input);
                App.CommonUtil.showTip(LangMger.getlocal("invitefriendTip9"));
            }
		}, view);
		view.addChildToContainer(copyBtn);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, copyBtn, inputbg), [0,0];

		//ios原生环境隐藏复制按钮
		if(App.DeviceUtil.isRuntime2() || App.DeviceUtil.isWXgame())
		{
			copyBtn.visible = false;
		}

        let reloadImg = BaseBitmap.create(`reloading`);
        view.addChildToContainer(reloadImg);
        reloadImg.anchorOffsetX = reloadImg.width / 2;
        reloadImg.anchorOffsetY = reloadImg.height / 2;
        reloadImg.x = view.viewBg.width / 2; 
        reloadImg.y = 40;
		egret.Tween.get(reloadImg, {loop : true}).to({rotation : -360}, 1500);
		view._showLoading = reloadImg;

        let tipTxt = ComponentMgr.getTextField(LangMger.getlocal(`warcreateroomtip1`), TextFieldConst.SIZE_CONTENT_SMALL_POPUP, ColorEnums.fight_color_1);
		view.addChildToContainer(tipTxt);
		tipTxt.bold = true;
        tipTxt.stroke = 1.5;
        tipTxt.strokeColor = ColorEnums.fight_strokeColor_1;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, inputbg, [0,inputbg.height+20]);
		view._tipTxt = tipTxt;

        //取消
        let cancelbtn = ComponentMgr.getButton(ButtonConst.BTN_CANCEL, LangMger.getlocal(`canelStr`), view.clickCancelHandler, view, null, null, 28);
        view.addChildToContainer(cancelbtn);
        // cancelbtn.setTextPos(null,25);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cancelbtn, tipTxt, [0,tipTxt.height+75]);
		
		// egret.Tween.get(view).wait(1000).call(()=>{
		// 	egret.Tween.removeTweens(view);
		// 	view.find();
		// },view);  
		view.find();
	}
	
	private get isWave():boolean{
        let view = this;
        let param = view.param.data;
        //type 1对战 2协同
        let type = param.type;
        return type == 2;
    }

    private _findTime:number=0;
	private _findTimeCount:number=-1;
	private _findNum:number=1;

	private find():void{
        if(this._end){
           if(this._findTimeCount!=-1){
			    egret.clearTimeout(this._findTimeCount);
			    this._findTimeCount=-1;
		    }
            return;
        }
        let param = this.param.data;
        //type 1对战 2协同
        let type = param.type;
		if(this._findTimeCount!=-1){
			egret.clearTimeout(this._findTimeCount);
			this._findTimeCount=-1;
		}
		this._findTime=egret.getTimer();
		NetManager.request(NetConst.BATTLE_FINDFRIEND,{
            findType:type,
			findNum:this._findNum,
			isCreate:1,
			passCode:0
		});
		this._findNum++;
	}

	// protected getTitleBgName():string{
    //     return `public_poptittle${this.isWave ? `purple` : `red`}`;
    // }

	
	private freshView(roomid : number):void{
		let view = this;
		view._showLoading.visible = false;
		view._showLoading.y = 140;
		view._roomTxt.visible = true;
		view._roomTxt.text = roomid.toString();
		view._tipTxt.text = LangMger.getlocal(`warcreateroomtip2`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._roomTxt, view._inputbg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._tipTxt, view._inputbg, [0,view._inputbg.height+20]);

		view._showLoading.visible = true;
	}

    private findResult(e:egret.Event):void{
        let isSuccess:boolean=false;
        let param = this.param.data;
        //type 1对战 2协同
        let type = param.type;
		let rdata=e.data;
		if(rdata.ret){
			if(this._iswait){
				let result = rdata.data.data.matchFlag;
				if(result){
					isSuccess = true;
					if(result == 1){
						if(rdata.data.data.randSeed){
							BattleStatus.randSeed = rdata.data.data.randSeed;
						}
						Api.BattleVoApi.startBattle(type);
					}
					else if(result == 2){
						App.CommonUtil.showTip(LangMger.getlocal(`warcreateroomtip8`));
					}
					else{
						App.CommonUtil.showTip(LangMger.getlocal(`warcreateroomtip7`));
					}
					if(param.findcallback){
						param.findcallback.apply(param.handler,[this]);
					}
					this.hide();
				}
			}
			else{
				let roomid = rdata.data.data.showRoomId;
				if(roomid > 0){
					this.freshView(rdata.data.data.showRoomId)
					this._iswait = true;
				}
			}
		}
		if(!isSuccess){
			let t=egret.getTimer()-this._findTime;
			if(t>=980){
				this.find();
			}
			else{
				this._findTimeCount = egret.setTimeout(this.find,this,1000-t);
			}
		}
	}
	
    
	public dispose():void{
		let view = this;
        view._findTime = 0;
        if(view._findTimeCount!=-1){
			egret.clearTimeout(view._findTimeCount);
			view._findTimeCount=-1;
		}
        view._findNum = 1;
		view._roomTxt = null;
		view._tipTxt = null;
		view._showLoading = null;
		view._iswait = false;
		super.dispose();
	}
}