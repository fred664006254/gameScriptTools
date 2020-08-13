/** 绝地擂台   帮会列表
 * anthor  
 */

class AcBattleHistoryRankScrollItem extends ScrollListItem {

	// 标题文本
	private titleText: BaseTextField = null;

	//标题背景
	private titleBg: BaseBitmap = null;

	//内容背景
	private descBg: BaseDisplayObjectContainer = null;

	//内容图片
	private descImg: BaseBitmap = null;

	//内容购买按钮
	private descBtn: BaseButton = null;

	//内容时间文本
	private descTimeText: BaseTextField = null;

	//数据
	private _data: any = null;
	private _itemIndex: number = null; 
	private _nodeContainer:BaseDisplayObjectContainer;
	private  _code:any =null;
	private need:number =0;
	public constructor() {
		super();
	}
	protected initItem(index: number, data: any,code:any) 
	{
		this.width = 640;
		this._data = data;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
		this._code = code;
		let  nameStr = "battlelistbg1"; 
		if(index%2==0)
		{
			nameStr ='battlelistbg2';
		}
		let bit:BaseBitmap =BaseBitmap.create(nameStr);
		bit.width = this.width;
		this.addChild(bit);

		if(data.uid==Api.playerVoApi.getPlayerID())
		{
			let bit2:BaseBitmap =BaseBitmap.create("battlelisttouch");
			bit2.width = this.width;
			this.addChild(bit2);	
		}
	
		//index 排名
		let tarColor = null;
		switch(data.status){
			case 1:
				tarColor = TextFieldConst.COLOR_WARN_GREEN2;
				break;
			case 2:
				tarColor = TextFieldConst.COLOR_WARN_RED2;
				break;
			case 3:
				tarColor = TextFieldConst.COLOR_BLACK;
				break;
		}

		let pos = data.pos[0];
		let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
		rankTxt.text = data.myrank;
		rankTxt.x = pos.x + (pos.width - rankTxt.width) / 2 - 25;
		rankTxt.y = this.height/2 - rankTxt.height/2;
		this.addChild(rankTxt);

		pos = data.pos[1];
        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        nameTxt.text = data.name;
        nameTxt.x = pos.x + (pos.width - nameTxt.width) / 2 - 25;
        nameTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(nameTxt);  
       
        pos = data.pos[2];
        let allinameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        allinameTxt.text = data.alliname;
        allinameTxt.x = pos.x + (pos.width - allinameTxt.width) / 2 - 25;
        allinameTxt.y =  this.height/2 - allinameTxt.height/2;;
        this.addChild(allinameTxt);  

        pos = data.pos[3];
        let scoreTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        scoreTxt.text = (data.value);
        scoreTxt.x = pos.x + (pos.width - scoreTxt.width) / 2 - 25;
        scoreTxt.y = scoreTxt.y;
		this.addChild(scoreTxt);
		
		pos = data.pos[4];
        let statusTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        statusTxt.text = LanguageManager.getlocal(`battlestaut${data.status}`);
        statusTxt.x = pos.x + (pos.width - statusTxt.width) / 2 - 25;
        statusTxt.y = statusTxt.y;
        this.addChild(statusTxt);
	}  
	
	private get cfg() : Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_BATTLEGROUND, this._code);
    }

	private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, this._code);
    }
	public getSpaceY(): number {
		return -5;
	}
	public getSpaceX(): number {
		return 0;
	}

	private userShotCallback(event:egret.Event)
    {
        let data = event.data.data.data;
        if(String(data.ruid) == this._data.uid)
        {
            if(event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT)
            {
                data["crossZone"] = 1;
                data['zid'] = Api.mergeServerVoApi.getTrueZid(this._data.uid);
            }
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
        }
    }

	public dispose(): void {
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
		this.titleText = null;

		//标题背景
		this.titleBg = null;

		//内容背景
		this.descBg = null;

		//内容图片
		this.descImg = null;

		//内容购买按钮
		this.descBtn = null;

		//内容时间文本
		this.descTimeText = null;

		//数据
		this._data  = null;
		this._itemIndex  = null;
		super.dispose();
	}
}