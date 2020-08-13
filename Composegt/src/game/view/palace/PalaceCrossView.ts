/**
 * 跨服皇宫
 * author yanyuling
 * date 2018/03/19
 * @class PalaceCrossView
 *  与 PalaceView 的差异仅表现在posCfg 和背景图上，无它
 */

class PalaceCrossView extends PalaceView
{
    constructor()
    {
        super();
    }
    protected initView():void
	{
        super.initView();
    }

    public initPosCfg()
    {
         this._posList =   this._posList = Config.SceneCfg.getSceneCfgBySceneName("crosspalace");
    }

    protected getStartIdx():number
    {
        return 0;
    }
    protected getCorssBtnPath()
    {
        return "palacve_backBtn";
    }
    protected crossBtnHandler()
    {
        ViewController.getInstance().openView(ViewConst.COMMON.PALACEVIEW);
        this.hide();
    }

    public getBgRes():string
    {
        return "palace_bg3_2";
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
  
            // "palace_shadow6","palace_shadow7",
            "palace_building_flag5",
        ]);
	};
    
    protected getRequestData():{requestType:string,requestData:any}
	{ 
        return {requestType:NetRequestConst.REQUEST_PALACE_GETCROSSPALACE,requestData:{}};
	}
    public dispose():void
	{
        super.dispose();
    }
}