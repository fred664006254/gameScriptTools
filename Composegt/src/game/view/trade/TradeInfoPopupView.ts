/**
 * 商贸 胜利界面
 */
class TradeInfoPopupView extends BaseView
{
    private scrollView:any =null;
    private _moveCountainer:BaseDisplayObjectContainer =null;
    private rewardArrList:Array<RewardItemVo> =[];
    private _strArr:Array<string> = [];
    private _iconArr:Array<RewardItemVo> = [];
    private _fire_lizi:particle.GravityParticleSystem;
    private _itemStringContainer:BaseDisplayObjectContainer =null;
    private _itemContainer:BaseDisplayObjectContainer =null;
    
	public constructor() 
	{
		super();
	}
    protected getResourceList():string[]
	{
		return super.getResourceList().concat(
        [
            "battle_win_word",
            "fire_flake_json",
            "battle_win_light",
            "fire_flake",
        ]);
	}
    protected isShowMask():boolean
	{
		return true;
	}
    protected getTitleStr():string
	{
		return null;
	}
     
	public initView():void
	{	
        this._itemStringContainer=new BaseDisplayObjectContainer();
        this._itemContainer =new BaseDisplayObjectContainer();
        this.touchEnabled = true;
        this.addTouchTap(this.hide,this);

        this.viewBg.visible =false;
        let infoBg:BaseBitmap=BaseBitmap.create("public_9_wordbg"); 
        infoBg.width=640;
        infoBg.height=600;
        infoBg.setPosition(GameConfig.stageWidth/2 -infoBg.width/2 ,GameConfig.stageHeigth/2 -infoBg.height/2);
		this.addChildToContainer(infoBg);


        //胜利背景光效
        // let winLight:BaseBitmap = BaseBitmap.create("battle_win_light");
		// winLight.scaleY = 0.5;
		// winLight.setPosition(50,-10);
		// this.addChildToContainer(winLight);
        // winLight.alpha = 0;
		// egret.Tween.get(winLight).wait(100).to({alpha:1},100).wait(90).to({alpha:0},10);

        //胜利文字大小
        let winBitmap:BaseBitmap=BaseBitmap.create("battle_win_word");
        winBitmap.anchorOffsetX = winBitmap.width/2;
        winBitmap.anchorOffsetY = winBitmap.height/2;
		winBitmap.setPosition(GameConfig.stageWidth/2 , infoBg.y );
		this.addChildToContainer(winBitmap);
        winBitmap.scaleX=1.5;
        winBitmap.scaleY=1.5;
    	egret.Tween.get(winBitmap).to({scaleX:0.9, scaleY:0.9} ,120 ).to({ scaleX:1, scaleY:1 } ,50);

        //粒子效果
        this._fire_lizi = App.ParticleUtil.getParticle("fire_flake");
        this._fire_lizi.y =-150;
        this.addChildToContainer(this._fire_lizi);
        
        this.showAnim();

        var _data =this.param.data;
        if(_data)
        {
            var _windesTxt =ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_WHITE);
            _windesTxt.text  = LanguageManager.getlocal("tradeWindes",[_data.consumeGold,_data.tradeName]);
            _windesTxt.multiline = true;
            _windesTxt.lineSpacing = 5;
            _windesTxt.setPosition(30, infoBg.y +120);
            _windesTxt.width=580;
            _windesTxt.textAlign ="center";
            this.addChildToContainer(_windesTxt);
        }
    
        this._moveCountainer =new BaseDisplayObjectContainer();
		this.addChildToContainer(this._moveCountainer);
        // this._moveCountainer.y = _windesTxt.y+10;
        
        let scrollRect = new egret.Rectangle(0,0,640,540);
        if(this.scrollView==null)
		{
			this.scrollView =ComponentManager.getScrollView(this._moveCountainer,scrollRect);
			this.scrollView.x=10;  
			this.scrollView.y = infoBg.y +  170;
			this.addChildToContainer(this.scrollView);
		} 
        var curr_data =this.param.data.rdata;
        if(curr_data&&curr_data.data.trade.info&&curr_data.data.trade.info.rewards)
        {
          var rewards =this.param.data.rewards||curr_data.data.rewards;
        }
        else
        {
            rewards = "";
        }
        this.rewardArrList =[];
        
        if(rewards)
        {
            this.rewardArrList = GameData.formatRewardItem(rewards); 
            this.rewardArrList.sort(function(a: any,b: any):number
            {
                if(a.type > b.type) return 1;
                else if(a.type == b.type) return 0;
                return -1;
            });
        }
      
      
        let l:number=this.rewardArrList.length; 
        this._strArr =[];
        this._iconArr =[];
 
        // tradeWindes贸易积分
        if(curr_data&&curr_data.data.batchpoint)
        { 
            var str =LanguageManager.getlocal("tradepointdes",[curr_data.data.batchpoint+""])
            this._strArr.push(str);
        } 

        for(let i:number=0;i<l;i++)
        {   let curTypeNum =this.rewardArrList[i].type;
            if(curTypeNum==6||curTypeNum==1)
            {
                this._iconArr.push(this.rewardArrList[i]);
            }
            else
            {  
                 //红颜
                if(curTypeNum==12)
                {
                    let wifeCfg:Config.WifeItemCfg=Config.WifeCfg.getWifeCfgById(this.rewardArrList[i].id);
                    this._strArr.push(wifeCfg.name+this.rewardArrList[i].tipMessage);
                }
                //门客
                else if(curTypeNum==14||curTypeNum==15)
                {
                    let servantCfg =Config.ServantCfg.getServantItemById(this.rewardArrList[i].id);
                    this._strArr.push(servantCfg.name+this.rewardArrList[i].message);
                }
                else
                {
                    this._strArr.push(this.rewardArrList[i].name+this.rewardArrList[i].tipMessage);
                }
            }
        }   
       
        this.showItemIcon();
        this.showTxt();
	}
  
    private showItemIcon():void
    {   
       
        let scaleNum:number=0.88;
        let newnum :number =0;

        this._iconArr.sort(function(a: any,b: any):number
        {
            if(a.id > b.id) return 1;
            else if(a.id == b.id) return 0;
            return -1;
        });


        //icon 图标
        for(let i:number=0;i<this._iconArr.length;i++)
        {
            let icon:BaseDisplayObjectContainer=GameData.getItemIcon(this._iconArr[i],true);
            var num= i%4;
            icon.setPosition((icon.width+5)*num,(icon.height+20)*Math.floor(i/4));
            icon.scaleX =scaleNum;
            icon.scaleY =scaleNum;
            this._itemContainer.addChild(icon);
            newnum =(icon.height+20)*Math.floor(i/5);
        }

        this._itemContainer.setPosition(80,this._itemStringContainer.y+50+this._itemStringContainer.height);
        this._moveCountainer.addChild(this._itemContainer);
    }

    private showTxt():void
    {
         //文字字段
        for(let j:number =0;j<this._strArr.length;j++)
        {
             let _desTxt =	ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN2);//COLOR_WARN_GREEN2  
             _desTxt.text =this._strArr[j];
             var num=j%2;
             _desTxt.setPosition(90+(260)*num,(_desTxt.height+20)*Math.floor(j/2));
             this._itemStringContainer.addChild(_desTxt);
        }
        this._itemStringContainer.setPosition(0,10);
        this._moveCountainer.addChild(this._itemStringContainer);
    }

    private showAnim():void
	{	
		this._fire_lizi.start();
		let tmpthis = this;
		egret.Tween.get(this._fire_lizi,{loop:false}).wait(500).to({alpha:0},200).call(function(){
				if (this._fire_lizi){
					tmpthis.removeChildFromContainer(this._fire_lizi)
					this._fire_lizi = null;
				}
			});
	}
    
    //  protected resetBgSize():void
    // {
    //     // super.resetBgSize();
    //     this.closeBtn.y = this.viewBg.y;
    //     this.closeBtn.x =this.viewBg.x +this.viewBg.width-80;
    // }

    public hide()
    {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_TRADE_AFTER_FIGHT);
        super.hide();
    }

	public dispose():void
    {
         this._moveCountainer=null;
         this.rewardArrList=[];
         this.scrollView=null;
         this._strArr =[];
         this._iconArr =[];
         this._fire_lizi =null;
         this._itemStringContainer =null;
         this._itemContainer =null;
	     super.dispose();
	}
}