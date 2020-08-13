/**
 * 才情加成
 * author jiangliuyang
 */
class WifeTalentBuffPopupView extends PopupView
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

	public initView():void
	{		

		let uidata = this.param.data;
		let scrollListBgRect=egret.Rectangle.create();
		scrollListBgRect.setTo(0,0,518,541);

		let view = this;
	
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

		let model = Api.wifebattleVoApi.wifebattleVo;
		let artsum = model.info.artsum?model.info.artsum:0;

		let scroRect = new egret.Rectangle(0, 0, bg2.width, contentBg.height - 12 - bg2.height - 10);
		this._scrollList1 = ComponentManager.getScrollList(WifeTalentBuffScrollItem, uidata, scroRect,artsum);
		this._scrollList1.x = this.viewBg.width/2 - this._scrollList1.width/2;
		this._scrollList1.y = bg2.y + bg2.height;
		this.addChildToContainer(this._scrollList1);

		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalent_bufftxt3"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(65+GameData.popupviewOffsetX, bg2.y+bg2.height/2 - rankText.height/2);
		this.addChildToContainer(rankText);
		this._rankText = rankText

		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalent_bufftxt4"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(155+GameData.popupviewOffsetX, rankText.y);
		this.addChildToContainer(nameText);
		this._nameText = nameText

		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalent_bufftxt5"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(335+GameData.popupviewOffsetX, rankText.y);
		this.addChildToContainer(scoreText);
		this._scoreText = scoreText

		let rcfg = Config.WifebattleCfg;
		let wifeBattleBuff = rcfg.wifeBattleBuff;
		let curlv = 1;
        let maxV = 0;
        for (let index = 0; index < wifeBattleBuff.length; index++) {
            let element = wifeBattleBuff[index];
            let artistryRange = element.artistryRange;
            if(artistryRange[0]<=artsum && artsum <= artistryRange[1])
            {
                maxV = artistryRange[1];
                break;
            }
            ++curlv;
		}
		this._scrollList1.setScrollTopByIndex(curlv - 1);
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