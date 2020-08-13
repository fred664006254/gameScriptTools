/** 绝地擂台   帮会列表
 * anthor  
 */

class AcBattleRank2ScrollItem extends ScrollListItem {

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
		this.width = 626;
		this._data = data;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
		this._code = code;
		let  nameStr = "battlelistbg1"; 
		if(index%2==0)
		{
			nameStr ='battlelistbg2';
		}
		let bit:BaseBitmap =BaseBitmap.create(nameStr);
		bit.width = 620;
		bit.x=-5;
		this.addChild(bit);

		if(data.uid==Api.playerVoApi.getPlayerID())
		{
			let bit2:BaseBitmap =BaseBitmap.create("battlelisttouch");
			bit2.x=-5;
			this.addChild(bit2);	
		}
	

		//index 排名
		let rankNum = data.myrank;//index+1;
		let renkDesc = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3e1f0f);
	 	renkDesc.text = rankNum+"";
		renkDesc.y = bit.y +bit.height/2-renkDesc.height/2;
		// renkDesc.x =40;
		renkDesc.x = 5;
		renkDesc.width =70;
		renkDesc.textAlign = TextFieldConst.ALIGH_CENTER;
		this.addChild(renkDesc);

		//成员名称 
		let nameDesc = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3e1f0f);
		nameDesc.text = data.name;
	    nameDesc.y = renkDesc.y;
		// nameDesc.x = 183;
		nameDesc.y = renkDesc.y;
		nameDesc.width = 150;
		nameDesc.x = 140;
		nameDesc.textAlign = TextFieldConst.ALIGH_CENTER;
		this.addChild(nameDesc);

		//职位
		let teliminateDesc = ComponentManager.getTextField(LanguageManager.getlocal("allianceMemberPo"+data.po), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3e1f0f);
	 	teliminateDesc.y = renkDesc.y;
		teliminateDesc.x = 388; 
		this.addChild(teliminateDesc);
	 
		//分数
		let scoreDesc = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3e1f0f);
	 	scoreDesc.y = renkDesc.y;
		scoreDesc.x = 500;
		scoreDesc.width =100;
		scoreDesc.textAlign =TextFieldConst.ALIGH_CENTER;
		scoreDesc.text = (data.value ? data.value : (data.alive ? 0 : (LanguageManager.getlocal(`acBattleRoundOut-1`))))+"";
		this.addChild(scoreDesc);

		if(this.vo.getCurRound()!=0)//活动展示期
		{
			let need = this.cfg.weedOut[this.vo.getCurRound() - 1].btmLine;
			this.need  = need;
		}

		if(data.myrank > this.need)
		{
			scoreDesc.textColor = TextFieldConst.COLOR_WARN_RED2;
			if(!data.alive||data.alive==0)
			{
				scoreDesc.textColor = 0xaa825e;
			}
		} 
		else
		{
			scoreDesc.textColor = TextFieldConst.COLOR_WARN_GREEN2;
		}
		teliminateDesc.textColor =scoreDesc.textColor;
		nameDesc.textColor =scoreDesc.textColor;
		renkDesc.textColor =scoreDesc.textColor;
		this.addTouchTap(()=>{
            NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT,{
				ruid:data.uid,
				rzid:Api.mergeServerVoApi.getTrueZid(data.uid)
			});
        },this);
		// if(!data.alive)
		// {
		// 	scoreDesc.alpha = 0.7; 
		// 	teliminateDesc.alpha =scoreDesc.alpha;
		// 	nameDesc.alpha =scoreDesc.alpha;
		// 	renkDesc.alpha =scoreDesc.alpha;
		// }
		 
		 
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