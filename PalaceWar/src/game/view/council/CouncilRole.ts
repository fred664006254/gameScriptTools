/**
 * 称号人物形象
 * author qianjun
 * date 2017/11/01
 * @class DiscussRole
 */
class CouncilRole extends BaseDisplayObjectContainer
{
	private _roleImg:BaseLoadBitmap;
	private _headImg:BaseLoadBitmap;
	private _roleUid:number=0;
	private _roleTitleId:string;
	private _shadowImg:BaseBitmap;
	public constructor()
	{
		super();
		this.init();
	}
	private init():void
	{
		this.width = GameConfig.stageWidth;

		let roleImg = BaseLoadBitmap.create("palace_role_empty");
		roleImg.width = 517;
		roleImg.height = 775;
		this.setLayoutPosition(LayoutConst.horizontalCentertop, roleImg, this, [0,60]);
		roleImg.visible = true;
		roleImg.addTouchTap(this.roleImgClickHandler,this);
		this.addChild(roleImg);
		this._roleImg = roleImg;

		let shadowImg = BaseBitmap.create("palace_role_shadow");
		shadowImg.anchorOffsetX = shadowImg.width/2;
		shadowImg.x = this.width/2;
		// shadowImg.x = roleImg.x + roleImg.width/2 - shadowImg.width/2;
		this.addChildAt(shadowImg,0)
		this._shadowImg = shadowImg;
		this._shadowImg.y = this._roleImg.y+this._roleImg.height - this._shadowImg.height/2 - 20;
		//横版名字变竖版名字
		// if (PlatformManager.checkIsTextHorizontal()){
		// 	let titleImg = BaseLoadBitmap.create("user_title_3000_3");
		// 	titleImg.width = 213;
		// 	titleImg.height = 47;

		// 	this.addChild(titleImg)
		// 	this._titleImg = titleImg;

		// } else {
		// 	let titleImg = BaseLoadBitmap.create("user_title_3000_3");
		// 	titleImg.width = 47;
		// 	titleImg.height = 103;
		// 	// titleImg.y = 30;
		// 	this.addChild(titleImg)
		// 	this._titleImg = titleImg;
		// }
    }
	/**
	 * 刷新展示
	 */
	public refreshUIWithData(data:any)
	{
		let titleinfo = App.CommonUtil.getTitleData(data.titleId);
		this._roleTitleId = titleinfo.title;
		this._roleImg.visible = false;
		let oldroleNode = this.getChildByName("roleNode");
		if (oldroleNode)
			this.removeChild(oldroleNode);

		let pic = data.pic;
		// if (data.titleId && Config.TitleCfg.checkHasSpecialHead(data.titleId))
		// {
		// 	pic= Config.TitleCfg.getSpecialHead(data.titleId,pic);
		// }

		if( (Config.TitleCfg.isTheKingTitleId(this._roleTitleId) && data.uid != "")|| (data instanceof PalaceRoleInfoVo && data.uid > 0) )
		{
			let titlecfg = Config.TitleCfg.getTitleCfgById(this._roleTitleId);
			let isCross = titlecfg.isCross;
			this._roleUid = data.uid;
			let roleNode:BaseDisplayObjectContainer = undefined;

			let resPath = "palace_db_" + this._roleTitleId;
			let flag = true;

			if(App.DeviceUtil.CheckWebglRenderMode() && ResourceManager.hasRes(resPath + "_ske") && flag)
			// if(data.titleId == "3201")
			{	
				let myHair = null;
				let loadIdx:number=0;
				roleNode = App.DragonBonesUtil.getLoadDragonBones(resPath,0,"idle",()=>{
					loadIdx++;
					if(loadIdx>=3)
					{
						if(roleNode)
						{
							roleNode.visible=true;
						}
						if(myHead)
						{
							myHead.visible=true;
						}
						if(myHair)
						{
							myHair.visible=true;
						}
					}
				},this);
				if(loadIdx==0)
				{
					roleNode.visible=false;
				}
				// roleNode.width = 470;
				// roleNode.height = 429;
				roleNode.setScale(1.4);
				roleNode.y = 100;


				
				let hairPic = "user_hair" + pic;
				if(pic <= 5 || (!ResourceManager.hasRes(hairPic))){
					hairPic = "user_hair" + 7;
				}
				let rect12:egret.Rectangle=egret.Rectangle.create();
				rect12.setTo(0,0,85,140);
				myHair= BaseLoadBitmap.create(hairPic,rect12,{callback:()=>{
					loadIdx++;
					if(loadIdx>=3)
					{
						if(roleNode)
						{
							roleNode.visible=true;
						}
						if(myHead)
						{
							myHead.visible=true;
						}
						if(myHair)
						{
							myHair.visible=true;
						}
					}
				},callbackThisObj:this});
				myHair.visible=false;
				myHair.name = "myHair";
				this.addChild(myHair);

				//this.setLayoutPosition(LayoutConst.horizontalCentertop, roleNode, this._roleImg);
				let rect1:egret.Rectangle=egret.Rectangle.create();
				rect1.setTo(0,0,136,143);
				let myHead = BaseLoadBitmap.create("user_head" + pic,rect1,{callback:()=>{
					loadIdx++;
					if(loadIdx>=2)
					{
						if(roleNode)
						{
							roleNode.visible=true;
						}
						if(myHead)
						{
							myHead.visible=true;
						}
					}
				},callbackThisObj:this});
				if(loadIdx==0)
				{
					myHead.visible=false;
				}
				myHead.width = 136;
				myHead.height = 143;

				myHead.name = "myHead";
				this.setLayoutPosition(LayoutConst.horizontalCentertop, myHead, this, [0, roleNode.y - 87]);
				this.setLayoutPosition(LayoutConst.horizontalCentertop, myHair, this, [0, roleNode.y - 87]);
				this.addChild(myHead);
				this._shadowImg.y = roleNode.y + 670 - this._shadowImg.height/2 - 15;
				this._shadowImg.visible = false;
			}else{
				// let arr:string[] = data.titleId.split("_");
				// let curLv:string;
				// if (!Config.TitleCfg.getIsTitleOnly(arr[0]))
                // {
                //     curLv = arr[0];
                // }
				roleNode = Api.playerVoApi.getPlayerPortrait(Number(this._roleTitleId),pic );
				if(Config.TitleCfg.isTheKingTitleId(this._roleTitleId) ){
					let rect12:egret.Rectangle=egret.Rectangle.create();
					rect12.setTo(0,0,712,668);
					let myBody = <BaseLoadBitmap>roleNode.getChildByName("myBody");
					myBody.setload("user_body_full_3201_2",rect12);
					myBody.width =712;
					myBody.height = 668;
					myBody.visible=true;
					let myHead =  <BaseLoadBitmap>roleNode.getChildByName("myHead");
					myHead.x = 356-70;
					myHead.visible = true;
				}
				roleNode.y = 60;
				this._shadowImg.y = roleNode.y + roleNode.height - this._shadowImg.height/2 - 20;
				this._shadowImg.visible = true;
			}
			roleNode.name = "roleNode";
			
			roleNode.x = this.width/2 - roleNode.width/2;
			this.addChild(roleNode);
			roleNode.addTouchTap(this.roleImgClickHandler,this);
			this.swapChildren(this._shadowImg, roleNode);
		}else
		{
			this._roleUid = 0;
			this._shadowImg.visible = false;
			this._roleImg.y = 60;
			this._roleImg.width = 517;
			this._roleImg.height = 775;
			if(Config.TitleCfg.isTheKingTitleId(this._roleTitleId)){
				this._roleImg.setload('palace_king_empty');
				this._roleImg.width = 517;
				this._roleImg.height = 775;
			}
			this._roleImg.anchorOffsetX = this._roleImg.width/2 ;
			// this._roleImg.x = this.width/2 -this._roleImg.width/2 ;
			this._roleImg.visible = true;
		}
	}

	
	// protected userShotCallback(event:egret.Event)
    // {
    //     let data = event.data.data.data;
    //     if(data.ruid == this._roleUid)
    //     {
    //         ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
    //     }
    // }
	public getHeight()
	{
		return 832;
	}

	protected roleImgClickHandler()
	{
		if(this._roleUid == 0)
		{
			return ;
		}
		 NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._roleUid});
	}
	public dispose():void
	{
		//App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this);

		this._roleImg = null;
		this._shadowImg = null;
		this._headImg = null;
		this._roleUid = null;
		this._roleTitleId = null;
		super.dispose();
	}
}