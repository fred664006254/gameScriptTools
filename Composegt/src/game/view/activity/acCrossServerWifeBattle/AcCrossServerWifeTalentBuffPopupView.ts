/**
 * 才情加成
 * author jiangliuyang
 */
class AcCrossServerWifeTalentBuffPopupView extends PopupView
{
	
	private _rankText:BaseTextField = null;
	private _nameText:BaseTextField = null;
	private _scoreText:BaseTextField = null;
	private _descText:BaseTextField = null;
	private _scrollList1 = null;

	public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}
	private get cfg() : Config.AcCfg.CrossServerWifeBattleCfg{
 		return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid,this.param.data.code);
	}
	private get vo() : AcCrossServerWifeBattleVo{
        return <AcCrossServerWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid,this.param.data.code);
    }
	public initView():void
	{		

		let uidata = this.param.data.p;
		let scrollListBgRect=egret.Rectangle.create();
		scrollListBgRect.setTo(0,0,518,541);

		let view = this;
	
		let contentBg = BaseBitmap.create("public_tc_bg01");
		contentBg.width = 540; //538
		contentBg.height = 600; //666
		contentBg.x = this.viewBg.width / 2 - contentBg.width/2;//view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
		contentBg.y = 20;
		view.addChildToContainer(contentBg);

		let bg1= BaseBitmap.create("public_tc_bg03");
        bg1.width = contentBg.width -20;
        bg1.height = contentBg.height - 20;
        bg1.x = contentBg.x + 10;
		bg1.y = contentBg.y +10;
        this.addChildToContainer(bg1);

		let bg2= BaseBitmap.create("public_up3");
		bg2.width = bg1.width - 10;
		bg2.height = 30;
        bg2.x = this.viewBg.width/2 - bg2.width/2;
        bg2.y = bg1.y + 5;
        this.addChildToContainer(bg2);

		let model = this.vo.wifebattlecross;//Api.wifebattleVoApi.wifebattleVo;
		let artsum = model.info.artsum?model.info.artsum:0;

		let scroRect = new egret.Rectangle(0, 0, bg2.width, bg1.height - 12 - bg2.height - 10);
		this._scrollList1 = ComponentManager.getScrollList(WifeTalentBuffScrollItem, uidata, scroRect,artsum);
		this._scrollList1.x = this.viewBg.width/2 - this._scrollList1.width/2;
		this._scrollList1.y = bg2.y + bg2.height + 5;
		this.addChildToContainer(this._scrollList1);

		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalent_bufftxt3"),20,TextFieldConst.COLOR_BROWN);
		rankText.setPosition(120 - rankText.width/2 , bg2.y+bg2.height/2 - rankText.height/2);
		this.addChildToContainer(rankText);
		this._rankText = rankText

		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalent_bufftxt4"),20,TextFieldConst.COLOR_BROWN);
		nameText.setPosition(250 -nameText.width/2, rankText.y);
		this.addChildToContainer(nameText);
		this._nameText = nameText

		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalent_bufftxt5"),20,TextFieldConst.COLOR_BROWN);
		scoreText.setPosition(460 -scoreText.width/2, rankText.y);
		this.addChildToContainer(scoreText);
		this._scoreText = scoreText

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