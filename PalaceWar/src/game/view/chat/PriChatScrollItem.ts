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
        //let data = chatData[0];

        let bg = BaseBitmap.create('public_9_bg35');
        bg.width = 604;
        bg.height = 129;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
        view.addChild(bg);
        //头像背景
        let posStr = null;
        if(chatData.content.headBg && Api.switchVoApi.checkVip1Privilege()){
            posStr = chatData.content.headBg;
        }
        let headContaner = Api.playerVoApi.getPlayerCircleHead(Number(chatData.content.pic),posStr);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, headContaner, bg, [30,0]);
        view.addChild(headContaner);


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

        let nameTxt = ComponentManager.getTextField(chatData.sendername, 24, 0xa87e00);
        view.setLayoutPosition(LayoutConst.lefttop, nameTxt, headContaner, [headContaner.width * headContaner.scaleX + 20,20]);
        view.addChild(nameTxt);

        let msg : string = chatData.content.message;//chatData.content.message.length > 15 ? (chatData.content.message) : chatData.content.message;
        msg = Api.emoticonVoApi.chatStrChangeLocal(msg);
        if(msg.length > 10){
            msg = msg.substring(0, 11) + '...';
        }
        let newTxt = ComponentManager.getTextField(msg, 24, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, newTxt, nameTxt, [0, nameTxt.textHeight + 20]);
        view.addChild(newTxt);

        view.cacheAsBitmap=true;
        view.addTouchTap(view.clickPriChat, view);

        let vipFlag:BaseLoadBitmap = null;
        let isself = (chatData.sender == Api.playerVoApi.getPlayerID()) || (typeof chatData.issender == 'undefined' ? false : (chatData.issender == 0));
         if(isself || !chatData.content.hideVip){
            if(chatData.content.vip && chatData.content.vip > 0 && !PlatformManager.checkIsKRSp()){
                vipFlag = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(chatData.content.vip).icon);
                vipFlag.setScale(0.65);
                vipFlag.setPosition(headContaner.x + headContaner.width / 2 - 33,headContaner.y + headContaner.height - 20 - 10);
                view.addChild(vipFlag);
            }
        }
    }

    private clickPriChat(){
        let view = this;
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