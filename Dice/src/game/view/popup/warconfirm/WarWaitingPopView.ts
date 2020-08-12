/**
 * 等待匹配
 * author qianjun
 * 
 */
class WarWaitingPopView extends PopupView{

    private _end = false;
	public constructor() {
		super();
    }
    protected getNetConstEventArr():string[]{
		return [
            NetConst.BATTLE_FIND
		];
	}

	protected netEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case NetConst.BATTLE_FIND:
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

    private upgardeBack(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            // App.CommonUtil.showTip(LangMger.getlocal(`sysUpgardeSucc`));
            // view.freshView();
        }
    }
    
	protected resetBgSize():void{
        let view = this;
        view._end = false;
        // view.viewBg.width = this.getShowWidth();
        // view.viewBg.height = this.getShowHeight();
        super.resetBgSize();
        view.viewBg.y = (GameConfig.stageHeigth - view.viewBg.height - 35 - 154) / 2;
        view.container.y = view.viewBg.y + view._titleBg.height + view.getContainerY();
        if(this._titleBg)
        {
            this._titleBg.x = this.viewBg.x + this.viewBg.width/2 - 286.5;
            this._titleBg.y = this.viewBg.y - 20;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, this._titleBg2, this._titleBg, [-28,0]);
        }
        if(this.titleTF)
        {
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this.titleTF, this._titleBg, [50,0]);
        }
        if(this.closeBtn)
        {
            if(this._titleBg){
                this.closeBtn.x = PlatMgr.hasSpcialCloseBtn()? 0 : (this._titleBg.x + this._titleBg.width - this.closeBtn.width-10);
            } else {
                this.closeBtn.x = PlatMgr.hasSpcialCloseBtn()? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width-17);

            }
            this.closeBtn.y = this._titleBg.y+(this._titleBg.height - this.closeBtn.height)/2;
        }
        let param = view.param.data;
        //type 1对战 2协同
        let type = param.type;

        let reloadImg = BaseBitmap.create(`reloading`);
        view.addChildToContainer(reloadImg);
        reloadImg.anchorOffsetX = reloadImg.width / 2;
        reloadImg.anchorOffsetY = reloadImg.height / 2;
        reloadImg.x = view.viewBg.width / 2; 
        reloadImg.y = 20 + reloadImg.anchorOffsetY;
        egret.Tween.get(reloadImg, {loop : true}).to({rotation : -360}, 1500);

        //取消
        let cancelbtn = ComponentMgr.getButton(ButtonConst.BTN_CANCEL, LangMger.getlocal(`canelStr`), view.clickCancelHandler, view, null, null, 28);
        view.addChild(cancelbtn);
        // cancelbtn.setTextPos(null,25);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, cancelbtn, this.viewBg, [0,15]);

        //小提示
        let tipGroup = new BaseDisplayObjectContainer();
        tipGroup.width = 524;
        tipGroup.height = 154;
        view.addChild(tipGroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipGroup, view.viewBg, [0,view.viewBg.height]);

        let tipbg = BaseBitmap.create(`joinwartipbg`);
        tipbg.width = tipGroup.width;
        tipbg.height = tipGroup.height;
        tipGroup.addChild(tipbg);

        let tipTittleTxt = ComponentMgr.getTextField(LangMger.getlocal(`sysTip`), TextFieldConst.SIZE_CONTENT_COMMON, ColorEnums.white);
        tipGroup.addChild(tipTittleTxt);
        tipTittleTxt.stroke = 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTittleTxt, tipbg, [0,15]);

        let rid = App.MathUtil.getRandom(1,6);
        let tipTxt = ComponentMgr.getTextField(LangMger.getlocal(`warwaitngtip${rid}`), TextFieldConst.SIZE_CONTENT_SMALL_POPUP, 0x9FB7E4);
        tipGroup.addChild(tipTxt);
        tipTxt.stroke = 0;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipbg);

        let nextBtn = ComponentMgr.getButton(`public_alphabg`, ``, ()=>{
            rid = App.MathUtil.getRandom(1,6);
            tipTxt.text = LangMger.getlocal(`warwaitngtip${rid}`);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipbg);
        }, view);
        nextBtn.setBtnSize(150,152);
        let arrow = BaseBitmap.create("joinwartipbext");
        nextBtn.addChild(arrow);
        tipGroup.addChild(nextBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, nextBtn, tipbg, [-55,-55]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, arrow, nextBtn, [0,0]);

        egret.Tween.get(nextBtn).wait(1000).call(()=>{
			egret.Tween.removeTweens(nextBtn);
			view.find();
        },view);  
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
		if(this._findTimeCount!=-1)
		{
			egret.clearTimeout(this._findTimeCount);
			this._findTimeCount=-1;
		}
        this._findTime=egret.getTimer();
        
		NetManager.request(NetConst.BATTLE_FIND,{
            findType:type,
            findNum:this._findNum
        });
		this._findNum++;
	}
    
    protected clickCancelHandler(data:any):void{
        if((Api.GameinfoVoApi.checlIsInGuideId(2))){
            return;
        }
		let param = this.param;
        this._end = true;
		if(param.data.cancelcallback){
			param.data.cancelcallback.apply(param.data.handler,[this]);
        }
        NetManager.request(NetConst.BATTLE_CANCELFIND,{
            findType: param.data.type,
        });
		this.hide();
    }
    
    // protected getTitleBgName():string{
    //     return `public_poptittle${this.isWave ? `purple` : `red`}`;
    // }

	private get isWave():boolean{
        let view = this;
        let param = view.param.data;
        //type 1对战 2协同
        let type = param.type;
        return type == 2;
	}
    
	protected isTouchMaskClose():boolean{
		return false;
    }

    protected getTitleStr(){
        let param = this.param.data;
		return LangMger.getlocal(`warwaitng`);
	}
	
    // protected getCloseBtnName():string{
    //     return `popupview_closebtn${this.isWave ? `purple` : `red`}`;
    // }

	protected closeHandler(){
        if((Api.GameinfoVoApi.checlIsInGuideId(2))){
            return;
        }
        let param = this.param;
         this._end = true;
        if(param.data.cancelcallback){
			param.data.cancelcallback.apply(param.data.handler,[this]);
        }
		super.closeHandler();
    }
    
    // protected getShowWidth():number{
	// 	return 552;
	// }

	protected getShowHeight():number{
		return 350;
	}

	public hide(){		
		super.hide()
	}

	protected getResourceList():string[]{	
		let array:string[] = [];
		array.concat(super.getResourceList())
		return array.concat([
            `joinwartipbg`,`joinwartipbext`
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

    protected preInit():void{
        super.preInit();
        // if(Api.GameinfoVoApi.checlIsInGuideId(2)){
        //     App.CommonUtil.sendNewGuideId(2);
        // }
    }

    private findResult(e:egret.Event):void{
        let isSuccess:boolean=false;
        let param = this.param.data;
        //type 1对战 2协同
        let type = param.type;
		let rdata=e.data;
		if(rdata.ret){
            let result = rdata.data.data.matchFlag;
            if(result){
                if(result == 1){
                    if(rdata.data.data.randSeed){
                        BattleStatus.randSeed = rdata.data.data.randSeed;
                    }
                    if(type == 2){
                        Api.UserinfoVoApi.setFreshCard(false);
                    }
                    isSuccess=true;
                    Api.BattleVoApi.startBattle(type);
                }
                else if(result == 2){
                    isSuccess=true;
                    App.CommonUtil.showTip(LangMger.getlocal(`warcreateroomtip8`));
                }
                if(param.findcallback){
                    param.findcallback.apply(param.handler,[this]);
                }
                this.hide();
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
        if(view._findTimeCount!=-1)
		{
			egret.clearTimeout(view._findTimeCount);
			view._findTimeCount=-1;
		}
        view._findNum = 1;
		super.dispose();
	}
}