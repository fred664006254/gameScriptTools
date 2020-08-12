/*
 *@description: 龙珠项目战斗表情
 *@author: hwc 
 *@date: 2020-04-21 21:57:23
 *@version 0.0.1
 */

class ChatView extends BaseDisplayObjectContainer{

    private expList: BaseDisplayObjectContainer = null;
    private expbg: BaseBitmap = null;
    public itemCB:Function = null;
    constructor(){
        super();
    }

    public init(){
        let view = this;
        // 遮罩层
        let mask = BaseBitmap.create("public_alphabg");
        this.addChild(mask);
        mask.width = GameConfig.stageWidth;
        mask.height = GameConfig.stageHeigth;
        mask.x = 0;
        mask.y = 0;
        mask.addTouchTap(()=>{
            SoundMgr.playEffect(SoundConst.EFFECT_CLICK);
            view.parent.removeChild(view);
        }, view);
        let urls = ["dianzan", "fennu", "daku", "daxiao", "koubizi", "kaixin", "juqi", "leile", "xuanyao", "wanku"];
        // 是否购买高级表情
        let flag = Api.ShopVoApi.getEmotionHasBuyById(1);

        let expGroup = new BaseDisplayObjectContainer();
        this.addChild(expGroup);
        this.expList = expGroup;

        // 表情背景
        let expBg = BaseBitmap.create("chatview_exp_bg3");
        this.expbg = expBg;
        expGroup.addChild(expBg);
        expBg.height = flag ? 171 : 100;

        let freeExp = Config.ExpressionCfg.getFreeExpression();
        let dx = 5;
        for (let index = 0; index < freeExp.length; index++) {
            const item = freeExp[index];
            let itemBg = BaseBitmap.create("chatview_exp_item_bg");
            expGroup.addChild(itemBg);
            itemBg.x = expBg.x + 15 + (dx + itemBg.width) * index;
            if (flag) {
                itemBg.y = expBg.y + expBg.height - itemBg.height - 40;
            } else {
                itemBg.y = expBg.y + expBg.height - itemBg.height - 36;
            }
            let exp = BaseBitmap.create(`chat_view_${urls[index]}`);
            expGroup.addChild(exp);
            exp.x = itemBg.x;
            exp.y = itemBg.y;

            itemBg.addTouchTap(this.itemOnClick, this, [urls[index]]);
            
        }

        if(flag){
            let buyExp = Config.ExpressionCfg.getBuyExpre();
            for (let index = 0; index < buyExp.length; index++) {
                const item = buyExp[index];
                let itemBg = BaseBitmap.create("chatview_exp_item_bg");
                expGroup.addChild(itemBg);
                itemBg.x = expBg.x + 15 + (dx + itemBg.width) * index;
                itemBg.y = expBg.y + expBg.height - itemBg.height * 2 - 45;
                let exp = BaseBitmap.create(`chat_view_${urls[index + 5]}`);
                expGroup.addChild(exp);
                exp.x = itemBg.x;
                exp.y = itemBg.y;
                itemBg.addTouchTap(this.itemOnClick, this, [urls[index + 5]]);
            }
        }
    }

    public setExpListXY(x:number, y:number){
        if(!this.expList){
            return;
        }
        this.expList.setPosition(x, GameConfig.stageHeigth - y - this.expList.height);
    }

    public setExpBg(url:string){
        if(!url || !this.expbg){
            return;
        }
        this.expbg.texture = ResMgr.getRes(url);
    }

    private itemOnClick(params, data){
        NetManager.request(NetConst.BATTLE_OPT, {opt: 5, upId: data});
        if(this.itemCB){
            this.itemCB();
        }
        this.parent.removeChild(this);
    }

    public dispose(){
        this.expList = null;
        this.expbg = null;
        this.itemCB = null;
        super.dispose();
    }
}