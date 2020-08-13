/**
 * author:qianjun
 * desc:粮草信息item
*/
class AcThreeKingdomsFoodItem extends ScrollListItem
{
	public constructor() {
		super();
    }
    
    private _data : any = null;

	protected initItem(index:number,data:Config.AcCfg.ThreeKingdomsGetFoodRewardCfg,itemparam?){	
        let view = this;
        view.width = 629;
        view.height = 45;
        view._data = data;
        let code = itemparam;

        // let listbg = BaseBitmap.create(`threekingdomszranklistbg${kingdomid}`);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, rankTitle, [0,20]);
        // view.addChild(listbg);
        // view.addChild(rankTitle);
        let rank = data.rank[0] == data.rank[1] ? `${data.rank[0]}` : `${data.rank[0]}-${data.rank[1]}`;
        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRank3Tip3`, code), [rank,data.food2.toString()]), 20);
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, view, [30,0], true);

        let line = BaseBitmap.create(`public_line1`);
        view.addChild(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, line, view, [10,0], true);
    }
    
	public dispose():void{
        let view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        super.dispose();
    }
}