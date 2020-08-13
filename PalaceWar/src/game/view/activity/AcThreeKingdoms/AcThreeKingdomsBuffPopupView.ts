/**
 * 才情加成
 * author jiangliuyang
 */
class AcThreeKingdomsBuffPopupView extends PopupView
{
	
	private _rankText:BaseTextField = null;
	private _nameText:BaseTextField = null;
	private _scoreText:BaseTextField = null;
	private _descText:BaseTextField = null;
	private _scrollList1:ScrollList = null;

	public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			`wifetalentlistbg1`,`wifetalentlistbg2`
		]);
	}

	private get cfg() : Config.AcCfg.ThreeKingdomsCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcThreeKingdomsVo{
        return <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
			case 1:
				code = `1`;
				break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
    
    private get cityId():number{
        return this.param.data.cityid;
    }

    private get kingdomid():number{
        return this.param.data.kingdomid;
	}
	
    protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
	}

	public initView():void
	{		
		let view = this;
		// let uidata = this.param.data;
		let scrollListBgRect=egret.Rectangle.create();
		scrollListBgRect.setTo(0,0,518,541);
		let code = view.getUiCode();
	
		let contentBg = BaseBitmap.create("public_9_bg36");
		contentBg.width = 528; //538
		contentBg.height = 530; //666
		contentBg.x = this.viewBg.width / 2 - contentBg.width/2;//view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
		contentBg.y = 20;
		view.addChildToContainer(contentBg);

		let bg2= BaseBitmap.create("public_9_bg33");
		bg2.width = contentBg.width;
		bg2.height = 30;
        bg2.x = this.viewBg.width/2 - bg2.width/2;
        bg2.y = contentBg.y;
        this.addChildToContainer(bg2);

		// let model = Api.wifebattleVoApi.wifebattleVo;
		let armynum = view.vo.getCityKingdomArmy(view.kingdomid, view.cityId, view.vo.getMyKingdoms());

		
		let uidata = view.kingdomid == 0 ? view.cfg.troop2 : view.cfg.troop1;
		
		let curlv = 0;
		let maxV = 0;
	
        for (let index = 0; index < uidata.length; index++) {
            let element : Config.AcCfg.ThreeKingdomsTroop1Cfg = uidata[index];
            if(armynum < (element.needNum * 100000000)){
                break;
            }
            ++curlv;
		}

		let scroRect = new egret.Rectangle(0, 0, bg2.width, contentBg.height - 12 - bg2.height - 10);
		this._scrollList1 = ComponentManager.getScrollList(AcThreeKingdomsBuffScrollItem, uidata, scroRect, {num : armynum, curlv : curlv});
		this._scrollList1.x = this.viewBg.width/2 - this._scrollList1.width/2;
		this._scrollList1.y = bg2.y + bg2.height;
		this.addChildToContainer(this._scrollList1);

		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip34", code)),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(95, bg2.y+bg2.height/2 - rankText.height/2);
		this.addChildToContainer(rankText);
		this._rankText = rankText

		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip35", code)),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(190, rankText.y);
		this.addChildToContainer(nameText);
		this._nameText = nameText

		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip36", code)),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(380, rankText.y);
		this.addChildToContainer(scoreText);
		this._scoreText = scoreText
		if(curlv){
			this._scrollList1.setScrollTopByIndex(curlv - 1);
		}
		
	}

	protected getTitleStr():string{
		return App.CommonUtil.getCnByCode(`acThreeKingdomsTip40`, this.getUiCode());
    }

	public getTitleParams() {
		return [""];
	}

	public dispose():void{
		this._rankText = null;
		this._nameText = null;
		this._scoreText = null;
		this._descText = null;

		this._scrollList1 = null;
		super.dispose();
	}	
}