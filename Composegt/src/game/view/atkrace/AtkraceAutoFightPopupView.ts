
class AtkraceAutoFightPopupView extends PopupView
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
	/**生成新标头 */
	protected isHaveTitle():boolean
	{
		return true;
	}
    protected initView():void
    {
        if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}

		// let titleBg:BaseBitmap = BaseBitmap.create("public_tc_bg02");
		// titleBg.setPosition(55,12);
		// this.addChildToContainer(titleBg);
		let resBar:ResBar = ComponentManager.getResBar(1,true,175);
		resBar.setPosition(120,30);
		this.addChildToContainer(resBar);

		let moraleBg:BaseBitmap = BaseBitmap.create("public_hb_bg01");
		moraleBg.setPosition(380,30);
		this.addChildToContainer(moraleBg);

		let moraleIcon:BaseBitmap = BaseBitmap.create("atkrace_morale");
		moraleIcon.setPosition(moraleBg.x +3 , moraleBg.y+moraleBg.height/2 - 45/2);
		this.addChildToContainer(moraleIcon);
	
		let moraleText:BaseTextField = ComponentManager.getTextField( Api.atkraceVoApi.getMyInfo().morale.toString(),20,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		moraleText.setPosition(moraleIcon.x +50, moraleBg.y+moraleBg.height/2 - moraleText.height/2);
		this.addChildToContainer(moraleText);
		moraleBg.width = moraleText.width + 70;


        let typeBg:BaseBitmap = BaseBitmap.create("public_9v_bg12");
		typeBg.width = 530;
		typeBg.height = 450;
		typeBg.setPosition(this.viewBg.width/2-typeBg.width/2, 80);
		this.addChildToContainer(typeBg);

		let typeBg2:BaseBitmap = BaseBitmap.create("public_9v_bg12");
		typeBg2.width = 530;
		typeBg2.height = 155;
		typeBg2.x = this.viewBg.width/2 - typeBg2.width/2;
		typeBg2.y = typeBg.y + typeBg.height +10
		this.addChildToContainer(typeBg2);

        let posY:number = typeBg.y + 30;
        let optionText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightOption"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
		optionText.width = 460;
        optionText.textAlign = egret.HorizontalAlign.CENTER;
		optionText.lineSpacing = 6;
        optionText.setPosition(this.viewBg.width/2-optionText.width/2,posY-10);
		this.addChildToContainer(optionText);

        posY += optionText.height + 43;
        let posX:number = 70;
        for (let i:number=1; i<=4; i++)
        {
            let dot:BaseBitmap = BaseBitmap.create("public_select");
            dot.setPosition(posX,posY);
            this.addChildToContainer(dot);
            this._dotBtns.push(dot);

            let option:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightOption"+i),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
            option.width = 460;
            option.setPosition(dot.x + 45,posY+7);
            this.addChildToContainer(option);

			let containerBg:BaseBitmap=BaseBitmap.create("public_alphabg");
			containerBg.width=500;
			containerBg.height = option.height+11;
			containerBg.x = dot.x;
			containerBg.y = dot.y;
			containerBg.addTouchTap(this.dotHandle,this,[i]);
			this.addChildToContainer(containerBg);

            posY +=option.height + 27;
        }
        this.dotHandle(null,4);
        
        // posY+=2;
        // let line:BaseBitmap = BaseBitmap.create("public_line1");
        // line.setPosition(this.viewBg.width/2-line.width/2,posY);
        // this.addChildToContainer(line);
        // posY+=20;


        let infoDesc2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_2"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
		infoDesc2.setPosition(90, typeBg2.y + 25);
		this.addChildToContainer(infoDesc2);

		let infoDesc3:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_3"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
		infoDesc3.setPosition(400, infoDesc2.y);
		this.addChildToContainer(infoDesc3);

        let myAtkInfo:AtkraceAtkInfoVo = Api.atkraceVoApi.getMyFightInfo();
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

        // posY +=infoDesc2.height + 23;

        let infoText2:BaseTextField = ComponentManager.getTextField(atkAdd.toString() + "%",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN_NEW);
		infoText2.setPosition(infoDesc2.x + infoDesc2.width , infoDesc2.y);
		this.addChildToContainer(infoText2);

		let infoText3:BaseTextField = ComponentManager.getTextField(skillAdd.toString() + "%",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN_NEW);
		infoText3.setPosition(infoDesc3.x + infoDesc3.width, infoDesc3.y);
		this.addChildToContainer(infoText3);



		let bloodText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_property3"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
		bloodText.setPosition(infoDesc2.x , infoDesc2.y + 60);
		this.addChildToContainer(bloodText);


		let tempAttr:number = Number(myInfo.attr);
		tempAttr = tempAttr >0 ? tempAttr : 0;
		//血量具体
		let bloodText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_property3"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_RED_NEW);
		bloodText2.setPosition(bloodText.width+bloodText.x+20 , bloodText.y );
		bloodText2.text= tempAttr + "/"+ myInfo.fullattr;
		this.addChildToContainer(bloodText2);

		let progressBar:ProgressBar=ComponentManager.getProgressBar("progress_type3_red","progress_type3_bg",470);
		progressBar.x = this.viewBg.width/2 - progressBar.width/2;
		progressBar.y = typeBg2.y + 115;
		this.addChildToContainer(progressBar);

        // posY +=bloodText.height + 23;

		// progressBar.setText( myInfo.attr + "/"+ myInfo.fullattr);
		progressBar.setPercentage(tempAttr / myInfo.fullattr);

        // typeBg.height =  posY - typeBg.y;
		// typeBg2.height = typeBg.height - 20;
        let autoFight:BaseButton = ComponentManager.getButton( ButtonConst.BTN_BIG_YELLOW, "atkraceFight", this.attAllClickHandler, this);
        autoFight.setPosition(this.viewBg.width/2-autoFight.width/2, typeBg2.y  + typeBg2.height);
        this.addChildToContainer(autoFight);

    }

    private attAllClickHandler():void
    {
        
        this.request(NetRequestConst.REQUEST_ATKRACE_BATCHFIGHT,{ pos: this._dotIdx});
    }

    //请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
		let rData:any=data.data;
		if(data.ret==false)
		{
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ATKRACE_BATCH_FIGHT_RET_REFRESH);
			return;
		}
		if(rData.cmd==NetRequestConst.REQUEST_ATKRACE_BATCHFIGHT)
		{   
			ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEFIGHTINFOPOPUPVIEW,
			{info:{info:rData.data.alllogs,
				pos:this._dotIdx,
				respTmpAttr:rData.data.respTmpAttr,
				respMesid:rData.data.respMesid,
				fightNum:this._fightNum,
				oppoName:this._fightName,
				},
			f:this._callbackF,
			o:this._obj});
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

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"public_select","public_select_down",
		]);
	}

    // 计算背景高度时使用，在container高度的基础上添加该高度
	protected getBgExtraHeight():number
	{
		return 25;
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