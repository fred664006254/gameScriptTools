/**
 * 私聊
 * author dky
 * date 2017/10/26
 * @class ChatScrollItem
 */
class PriChatScrollItem extends ScrollListItem {

    public constructor() {
        super();
    }

    private _redpot : BaseBitmap = null;
    private _data : any = null;
    public initItem(index: number, chatData: any): void {

        let view = this;
        view._data = chatData;
        view.width = 604;
        view.height = 129;

        let bg = BaseBitmap.create('public_listbg');
        bg.width = 604;
        bg.height = 129;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
        view.addChild(bg);

        let title = chatData.content.title;
        if (chatData.sender == Api.playerVoApi.getPlayerID())
        {
            title = "-1"
        }
        else if (title==null)
        {
            title = "0";
        }
        //头像背景
        let posStr = "head_circle_bg";
        //  let posStr =  "head_circle_bg";//chatData.content.headID;
        if(chatData.content.headID && chatData.content.headID != ""){
            posStr = chatData.content.headID;
        }
        if(chatData.content.headBg && Api.switchVoApi.checkVip1Privilege() && chatData.content.headBg != 'head_circle_bg_0'){
            posStr = chatData.content.headBg;
        }
        // posStr = posStr.substr(15);// head_circle_bg
        let headContaner = Api.playerVoApi.getPlayerCircleHead(Number(chatData.content.pic),posStr);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, headContaner, bg, [30,0]);
        view.addChild(headContaner);
        //头像框等级
        let head = headContaner.getChildByName("myHead");
       
        let titleLv = chatData.content.titleLv;
        if(titleLv && titleLv != 0){
            let lvbg:BaseBitmap = BaseBitmap.create("public_lvupbg");
			lvbg.setPosition(head.x + head.width * head.scaleX /2 - lvbg.width /2, headContaner.height-lvbg.height+3);
			headContaner.addChild(lvbg);

			let levelTf:BaseTextField = ComponentManager.getTextField("Lv."+String(titleLv),16,TextFieldConst.COLOR_BROWN);
			levelTf.x = lvbg.x + lvbg.width/2 - levelTf.width/2;
			levelTf.y = lvbg.y ;
			headContaner.addChild(levelTf);
        }




        let redpot = BaseBitmap.create("public_dot2");
        redpot.scaleX = redpot.scaleY = 1.5;
        view.setLayoutPosition(LayoutConst.lefttop, redpot, headContaner, [-10,5]);
        view.addChild(redpot);
        view._redpot = redpot;
        redpot.visible = Api.chatVoApi.getUnreadMsgNum(chatData.sender) > 0;

        let num = Api.chatVoApi.getUnreadMsgNum(chatData.sender);
        let unreadTxt = ComponentManager.getTextField(num.toString(), 17, TextFieldConst.COLOR_QUALITY_WHITE);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, unreadTxt, redpot);
        view.addChild(unreadTxt);
        unreadTxt.visible = redpot.visible;

        let nameTxt = ComponentManager.getTextField(chatData.sendername, 24, 0xE37444);
        view.setLayoutPosition(LayoutConst.lefttop, nameTxt, headContaner, [headContaner.width * headContaner.scaleX + 20,10]);
        view.addChild(nameTxt);

        let msg : string = chatData.content.message;//chatData.content.message.length > 15 ? (chatData.content.message) : chatData.content.message;
        if(msg.length > 10){
            msg = msg.substring(0, 11) + '...';
        }
        let newTxt = ComponentManager.getTextField(msg, 24, TextFieldConst.COLOR_BROWN);
        newTxt.lineSpacing = 7;
        view.setLayoutPosition(LayoutConst.lefttop, newTxt, nameTxt, [0, nameTxt.textHeight + 10]);
        view.addChild(newTxt);

        view.cacheAsBitmap=true;
        view.addTouchTap(view.clickPriChat, view);
    }

    private clickPriChat(){
        let view = this;
        if(Api.switchVoApi.checkCloseChat())
		{
			App.CommonUtil.showTip("很抱歉，聊天系统维护中");
			return;
		}
        ViewController.getInstance().openView(ViewConst.POPUP.PRICHATVIEW, view._data);
    }

    public getSpaceY(): number {
        return 0;
    }

    public dispose(): void {
        this.cacheAsBitmap = true;
        this._redpot = null;
        super.dispose();
    }
}