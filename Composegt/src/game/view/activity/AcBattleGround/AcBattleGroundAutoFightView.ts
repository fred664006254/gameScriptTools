
class AcBattleGroundAutoFightView extends PopupView
{   
    private _dotBtns:BaseBitmap[] = [];
    private _dotIdx:number = 0;
    private _callbackF:Function = null;
	private _obj:any = null;

	private _fightNum:number = 0;
	private _fightName:string = null;

    public constructor() {
		super();
	}

	private get cfg() : Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
    }

    protected initView():void
    {
        if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}

		let titleBg:BaseBitmap = BaseBitmap.create("public_tc_bg02");
		titleBg.setPosition(55,12);
		this.addChildToContainer(titleBg);

        let gemsBg:BaseBitmap = BaseBitmap.create("public_hb_bg01");
		gemsBg.setPosition(120,20);
		this.addChildToContainer(gemsBg);

		let rect:egret.Rectangle=egret.Rectangle.create();
		rect.setTo(0,0,45,45);
		let goldIcon:BaseLoadBitmap = BaseLoadBitmap.create("itemicon1",rect);
		goldIcon.setPosition(gemsBg.x -1, gemsBg.y+gemsBg.height/2 - 45/2);
		this.addChildToContainer(goldIcon);

		let goldText:BaseTextField = ComponentManager.getTextField(Api.playerVoApi.getPlayerGemStr(),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		goldText.setPosition(goldIcon.x +50, gemsBg.y+gemsBg.height/2 - goldText.height/2);
		this.addChildToContainer(goldText);
		gemsBg.width = goldText.width + 70;
		
		let moraleBg:BaseBitmap = BaseBitmap.create("public_hb_bg01");
		moraleBg.setPosition(320,20);
		this.addChildToContainer(moraleBg);

		let moraleIcon:BaseBitmap = BaseBitmap.create("atkrace_morale");
		moraleIcon.setPosition(moraleBg.x +3 , moraleBg.y+moraleBg.height/2 - 45/2);
		this.addChildToContainer(moraleIcon);

	
		let moraleText:BaseTextField = ComponentManager.getTextField(this.vo.getMyInfo().morale.toString(),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		moraleText.setPosition(moraleIcon.x +50, moraleBg.y+moraleBg.height/2 - moraleText.height/2);
		this.addChildToContainer(moraleText);

		moraleBg.width = moraleText.width + 70;


        let typeBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		typeBg.width = 528;
		typeBg.height = 250;
		typeBg.setPosition(this.viewBg.width/2-typeBg.width/2, 65);
		this.addChildToContainer(typeBg);

		let typeBg2:BaseBitmap = BaseBitmap.create("public_9v_bg04");
		typeBg2.width = typeBg.width-20;
		typeBg2.height = typeBg.height-20;
		typeBg2.setPosition(typeBg.x+10, typeBg.y + 10);
		this.addChildToContainer(typeBg2);

        let posY:number = typeBg.y + 30;
        let optionText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightOption"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		optionText.width = 460;
        optionText.textAlign = egret.HorizontalAlign.CENTER;
		optionText.lineSpacing = 6;
        optionText.setPosition(this.viewBg.width/2-optionText.width/2,posY);
		this.addChildToContainer(optionText);

        posY += optionText.height + 23;
        let posX:number = 70;
        for (let i:number=1; i<=4; i++)
        {
            let dot:BaseBitmap = BaseBitmap.create("public_select");
            dot.setPosition(posX,posY);
            this.addChildToContainer(dot);
            this._dotBtns.push(dot);

            let option:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightOption"+i),TextFieldConst.FONTSIZE_CONTENT_COMMON);
            option.width = 460;
            option.setPosition(dot.x + 35,posY);
            this.addChildToContainer(option);

			let containerBg:BaseBitmap=BaseBitmap.create("public_alphabg");
			containerBg.width=500;
			containerBg.height = option.height+11;
			containerBg.x = dot.x;
			containerBg.y = dot.y-11;
			containerBg.addTouchTap(this.dotHandle,this,[i]);
			this.addChildToContainer(containerBg);

            posY +=option.height + 22;
        }
        this.dotHandle(null,4);
        
        posY+=2;
        let line:BaseBitmap = BaseBitmap.create("public_line1");
        line.setPosition(this.viewBg.width/2-line.width/2,posY);
        this.addChildToContainer(line);
        posY+=20;


        let infoDesc2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_2"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		infoDesc2.setPosition(posX, posY);
		this.addChildToContainer(infoDesc2);

		let infoDesc3:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_3"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		infoDesc3.setPosition(280, infoDesc2.y);
		this.addChildToContainer(infoDesc3);

        let myAtkInfo:AtkraceAtkInfoVo = this.vo.getMyFightInfo();
		let myInfo:AtkraceServantVo = myAtkInfo.mesid;

		this._fightName = myAtkInfo.getFName();

		let tmpatt:any = myAtkInfo.tmpattr;
		let atkAdd:number =  0;
		let skillAdd:number = 0;
		if (tmpatt) {
			if (tmpatt.atk) {
				atkAdd=Math.floor(tmpatt.atk*100);
			}
			if (tmpatt.skill) {
				skillAdd=Math.floor(tmpatt.skill*100);
			}
		}

        posY +=infoDesc2.height + 23;

        let infoText2:BaseTextField = ComponentManager.getTextField(atkAdd.toString() + "%",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN);
		infoText2.setPosition(infoDesc2.x + infoDesc2.width , infoDesc2.y);
		this.addChildToContainer(infoText2);

		let infoText3:BaseTextField = ComponentManager.getTextField(skillAdd.toString() + "%",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_QUALITY_GREEN);
		infoText3.setPosition(infoDesc3.x + infoDesc3.width, infoDesc3.y);
		this.addChildToContainer(infoText3);



		let bloodText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_property3"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		bloodText.setPosition(posX , posY);
		this.addChildToContainer(bloodText);

		let progressBar:ProgressBar=ComponentManager.getProgressBar("progress_type1_red","progress_type1_bg",380);
		progressBar.x = bloodText.x + bloodText.width + 20;
		progressBar.y = bloodText.y - progressBar.height/2 + bloodText.height/2;
		this.addChildToContainer(progressBar);

         posY +=bloodText.height + 23;


		progressBar.setText( myInfo.attr + "/"+ myInfo.fullattr);
		progressBar.setPercentage(myInfo.attr / myInfo.fullattr);


        typeBg.height =  posY - typeBg.y;
		typeBg2.height = typeBg.height - 20;

        let autoFight:BaseButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "atkraceFight", this.attAllClickHandler, this);
        autoFight.setPosition(this.viewBg.width/2-autoFight.width/2, typeBg.y + 20 + typeBg.height);
        this.addChildToContainer(autoFight);

    }

    private attAllClickHandler():void
    {
        
        this.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_AUTOFIGHT,{pos: this._dotIdx ,activeId:this.acTivityId});
    }

    //请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
		let rData:any=data.data;
		if(data.ret==false)
		{
			return;
		}
		if(rData.cmd==NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_AUTOFIGHT)
		{   
			if(rData.data.battleground){
				this.vo.setRaceInfo(rData.data.battleground);
			}
			if(data.data.data.newRound){
				this._callbackF.apply(this._obj);
				this.hideLoadingMask();
				this.hide();
				return;
			}
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND);
			ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEFIGHTINFOPOPUPVIEW,
			{info:{info:rData.data.alllogs,
				pos:this._dotIdx,
				respTmpAttr:rData.data.respTmpAttr,
				respMesid:rData.data.respMesid,
				fightNum:this._fightNum,
				oppoName:this._fightName,
				},
			f:this._callbackF,
			o:this._obj,
			type:3,
			morale:this.vo.getMyInfo().morale
		});
			this.hide();
		}
		
	}

    private dotHandle(obj:any,idx:number):void
    {
        if (idx != this._dotIdx)
        {
            if (this._dotIdx)
            {
                this._dotBtns[this._dotIdx-1].texture = ResourceManager.getRes("public_select");
            }
            this._dotBtns[idx-1].texture = ResourceManager.getRes("public_select_down");
            this._dotIdx = idx;
        }
    }

    // 计算背景高度时使用，在container高度的基础上添加该高度
	protected getBgExtraHeight():number
	{
		return 15;
	}

	protected getTitleStr():string
	{
		return "atkraceAutoFightPopupViewTitle";
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"progress_type1_red","progress_type1_bg"
		]);
	}
    public dispose():void
	{	
        this._dotBtns.length = 0;
        this._dotIdx = 0;
        this._callbackF = null;
		this._obj = null;
		this._fightNum = 0;

		super.dispose();
	}
}