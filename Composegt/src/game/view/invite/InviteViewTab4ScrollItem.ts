/**
 * 邀请排行列表节点
 * author 赵占涛
 * date 2018/3/9
 * @class InviteViewTab4ScrollItem
 */
class InviteViewTab4ScrollItem  extends ScrollListItem
{
    public constructor()
    {
        super();
     
    }

    protected initItem(index:number,userPid:string)
    {
        this.width = 602;
        this.height = 58;
        if (index % 2 === 0) {
            let evenNumberLine = BaseBitmap.create("public_tc_bg05");
            evenNumberLine.scaleX = this.width/evenNumberLine.width;
            evenNumberLine.scaleY = this.height/evenNumberLine.height;
            evenNumberLine.x = this.width/2 - evenNumberLine.width*evenNumberLine.scaleX/2;
            evenNumberLine.y = this.height/2 - evenNumberLine.height*evenNumberLine.scaleY/2;
            this.addChild(evenNumberLine);
        }
        if (index < 3)
        {
            let rankImg = BaseBitmap.create("rank_"+String(index+1))
            rankImg.x = 92-rankImg.width/2;
            rankImg.y = this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {
            let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
            rankTxt.text = String(index+1);
            rankTxt.x = 92 - rankTxt.width/2;
            rankTxt.y = this.height/2 - rankTxt.height/2;
            this.addChild(rankTxt);
        }
       

		// 玩家头像
		let head;
        let headStr = Api.inviteVoApi.getUserHeadByPid(userPid);
        if (headStr.substr(0, 4) === "http") {
            // headStr = decodeURIComponent(headStr);
            // 网络上的头像
            head = new BaseDisplayObjectContainer();
            head.width = 80;
            head.height = 80;
            let headIcon = BaseLoadBitmap.create(headStr);	
            headIcon.width = 80;
            headIcon.height = 80;	
            head.addChild(headIcon);	
            var circle:egret.Shape = new egret.Shape();
            circle.graphics.beginFill(0x0000ff);
            circle.graphics.drawCircle(40,40,40);
            circle.graphics.endFill();
            head.addChild(circle);
            headIcon.mask = circle;
            head.cacheAsBitmap = true;
            head.setScale(60/head.width);
        } else {
            // 游戏内头像
            head = new BaseDisplayObjectContainer();
            let posStr = "public_chatheadbg";
            let posBg:BaseBitmap = BaseBitmap.create(posStr);
            head.addChild(posBg)	

            let rect1:egret.Rectangle=egret.Rectangle.create();
            rect1.setTo(0,0,136,143);
            let posBB = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPathById(headStr),rect1);
            posBB.x = 0;
            posBB.y = -7;
            posBB.setScale(2/3);
            head.addChild(posBB);
            head.setScale(60/posBg.width);
        }
        
		head.x = 190 - head.width*head.scaleX;
        head.y =  this.height/2 - head.height/2*head.scaleY;
		this.addChild(head);


        let nameTxt = ComponentManager.getTextField(Api.inviteVoApi.getUserNicknameByPid(userPid),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        nameTxt.x = head.x + head.width*head.scaleX + 10;
        nameTxt.y =  this.height/2 - nameTxt.height/2;
        this.addChild(nameTxt);

        // 区
        let serverTxt = ComponentManager.getTextField(Api.mergeServerVoApi.getAfterMergeSeverName(Api.inviteVoApi.getUserUidByPid(userPid)),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        serverTxt.x = 382 - serverTxt.width/2;
        serverTxt.y =  this.height/2 - serverTxt.height/2;
        this.addChild(serverTxt);
        // 权势
        let powerTxt = ComponentManager.getTextField(Api.inviteVoApi.getUserPowerByPid(userPid),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        powerTxt.x = 514 - powerTxt.width/2;
        powerTxt.y =  this.height/2 - powerTxt.height/2;
        this.addChild(powerTxt);


        let lineImg = BaseBitmap.create("rank_line");
        lineImg.width = this.width- 20;
        lineImg.x = GameConfig.stageWidth /2 - lineImg.width/2;
        lineImg.y = this.height;
        this.addChild(lineImg);


        this.cacheAsBitmap=true;
    }

    public getSpaceX():number
	{
		return 10;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 5;
	}
    public dispose():void
    {

        this.cacheAsBitmap=false;

        super.dispose();
    }
}
