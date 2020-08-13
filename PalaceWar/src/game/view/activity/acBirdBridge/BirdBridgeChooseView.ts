/**
 * 奖励
 * author sl
 * date 2020.7.16
 * @class BirdBridgeChooseView
 */
class BirdBridgeChooseView extends PopupView
{
    public _selectId:number = 0;
    private _rewardNodeTab :BirdBridgeChooseIcon[] = [];
    public constructor(){
        super();
    }

    protected getTitleStr():string{
        return "chooseReward";
    }

     protected getResourceList():string[]{
        let code = "1";//this.param.data.uicode;
        let list:string[] = [
            "progress24_bg","progress24","birdbridge_limitbg-"+code,
            "birdbridge_got-"+code,"birdbridge_kuang1-"+code,"birdbridge_got-"+code,"birdbridge_light1-"+code
        ];
       
        return super.getResourceList().concat(list);
    }

    protected getTypeCode():string{

        return this.param.data.uicode;
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get vo():AcBirdBridgeVo{
        return <AcBirdBridgeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.BirdBridgeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public initView():void
    {
        let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 530;
        bg.height = 660;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 10;
        this.addChildToContainer(bg); 

        let scrollContiner = new BaseDisplayObjectContainer();
        let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,0,530,bg.height-8);

		let scrollView = ComponentManager.getScrollView(scrollContiner,rect);
		this.addChildToContainer(scrollView);
        scrollView.setPosition(bg.x,bg.y+4);
        scrollView.horizontalScrollPolicy = "off";

        let code = this.param.data.uicode;
        let cfgs = this.cfg.wish;
        if (this.vo.winfo.idx && this.vo.isWishMaxById(this.vo.winfo.idx)==false)
        {
            this._selectId = this.vo.winfo.idx;
        }
        for (let i=0; i<cfgs.length; i++)
        {   
            let onecfg= cfgs[i];
            let wishNum = this.vo.getWishValueById(onecfg.id);
            let gotNum = this.vo.getWishGotTimesById(onecfg.id);
            let oneNode = new BirdBridgeChooseIcon();
            oneNode.init(cfgs[i],gotNum,wishNum,code,this.chooseHandle,this);
            scrollContiner.addChild(oneNode);
            this._rewardNodeTab.push(oneNode);
            oneNode.setPosition(3+i%3*176,Math.floor(i/3)*222);

            if (onecfg.id == this._selectId)
            {
                oneNode.setSelect(true);
            }
        }

        if (this._selectId == 0)
        {
            for (let i=0; i<this._rewardNodeTab.length; i++)
            {
                let id = this._rewardNodeTab[i].cfg.id;
                if (this.vo.isWishMaxById(id)==false)
                {
                    this._selectId = id;
                    break;
                }
            } 
        }   

        for (let i=0; i<this._rewardNodeTab.length; i++)
        {
            let id = this._rewardNodeTab[i].cfg.id;
            this._rewardNodeTab[i].setSelect(id == this._selectId);
        } 


        let reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW, "adultChoose", () => {
            
            if(!this.vo.isInActivity()){
                App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                super.hide();
                return;
            }
            if (this.vo.isInActivity() && this._selectId && this._selectId != this.vo.winfo.idx)
            {
                NetManager.request(NetRequestConst.REQUEST_AC_BIRDBRIDGECHOOSEWISH, { activeId: this.vo.aidAndCode, rkey: this._selectId}); 
            }
            this.hide();
        }, this);
        reviceBtn.setPosition(bg.x + bg.width/2 - reviceBtn.width /2, bg.y + bg.height +12);
        this.addChildToContainer(reviceBtn);

    }

    private chooseHandle(icon:BirdBridgeChooseIcon):void
    {
        if (this._selectId == icon.cfg.id)
        {
            return;
        }
        this._selectId = icon.cfg.id;
        for (let i=0; i<this._rewardNodeTab.length; i++)
        {
            let id = this._rewardNodeTab[i].cfg.id;
            this._rewardNodeTab[i].setSelect(id == this._selectId);
        } 
    }

    protected closeHandler():void
    {   
        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            super.hide();
            return;
        }

        if ((this.vo.winfo.idx == 0 || this.vo.isWishMaxById(this.vo.winfo.idx)) && this.vo.isWishMax()==false )
        {
             NetManager.request(NetRequestConst.REQUEST_AC_BIRDBRIDGECHOOSEWISH, { activeId: this.vo.aidAndCode, rkey: this._selectId}); 
        }

        super.hide();
    }

    protected getBgExtraHeight():number
	{
		return 20;
	}

    public dispose():void
    {   
        this._rewardNodeTab.length = 0;
        this._selectId = 0;

        super.dispose();
    }
}