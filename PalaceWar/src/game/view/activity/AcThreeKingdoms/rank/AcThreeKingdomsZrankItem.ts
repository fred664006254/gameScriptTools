/**
 * author:qianjun
 * desc:阵营排行item
*/
class AcThreeKingdomsZrankItem extends ScrollListItem
{
	public constructor() {
		super();
    }
    
    private _data : any = null;

	protected initItem(index:number,data:any){	
        let view = this;
        view.width = 614
        view._data = data;

        let rankTitle = BaseBitmap.create(`threekingdomszrank${index+1}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rankTitle, view, [0,0], true);

        let kingdomid = data.kingdomid;
        let listbg = BaseBitmap.create(`threekingdomszranklistbg${kingdomid}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, rankTitle, [0,20]);
        view.addChild(listbg);
        view.addChild(rankTitle);
  
        let shuiyin = BaseBitmap.create(`threekingdomszranklistshuiyin${kingdomid}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, shuiyin, listbg, [10,40]);
        view.addChild(shuiyin);

        let scoreBitmapTxt : any = ComponentManager.getBitmapText(data.value,`socre_fnt`);
        scoreBitmapTxt.letterSpacing = -7;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, scoreBitmapTxt, listbg, [15,10]);
        view.addChild(scoreBitmapTxt);

        let scoreBitmap = BaseBitmap.create(`threekingdomszranktxt`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, scoreBitmap, scoreBitmapTxt, [scoreBitmapTxt.width,0]);
        view.addChild(scoreBitmap);
    }
    
	public dispose():void{
        let view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        super.dispose();
    }
}