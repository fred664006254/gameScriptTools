/**
 * 官品升级政绩不足提示
 * author chenke
 * date 2020/07/10
 * @class PlayerUpLimitPopupView
 * 
 */
class PlayerUpLimitPopupView extends PopupView
{
    private _cfg={
        exp:[
            {key:"dailytask",unlock:9,cnkey:"getExpTip1",plv:0},
            {key:"challenge",unlock:0,cnkey:"getExpTip2",plv:6},
        ],
        rate:[
            {key:"composepersion",unlock:0,cnkey:"getRateTip1",plv:0},
            {key:"buypersion",unlock:0,cnkey:"getRateTip2",plv:0},
        ],
    };
    private _lineBg:BaseBitmap;
    public constructor()
    {
        super();
    }

    protected getTitleStr():string
    {
        let type=this.param.data.type;
        return "playerUpLimit"+App.StringUtil.firstCharToUper(type)+"Title";
    }

    protected initView():void
    {
        let type=this.param.data.type;
        let bg = BaseBitmap.create("public_9v_bg12");
        this._lineBg=bg;
		bg.width = 526;
		bg.x = this.viewBg.width/2 - bg.width/2;
		bg.y = 5;
        this.addChildToContainer(bg);
        
        let titleBg=BaseBitmap.create("public_ts_bg01");
        this.addChildToContainer(titleBg);
        let tipTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("canGet"+App.StringUtil.firstCharToUper(type)+"Tip",[TextFieldConst.COLOR_WARN_GREEN+""]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
        tipTxt.setPosition(this.viewBg.width*0.5-tipTxt.width*0.5,bg.y+20);
        this.addChildToContainer(tipTxt);
        titleBg.width=106+tipTxt.width;
        titleBg.setPosition(this.viewBg.width*0.5-titleBg.width*0.5,tipTxt.y+(tipTxt.height-titleBg.height)*0.5);
        
        let idx=0;
        let cellH=130;
        for (let index = 0; index < this._cfg[type].length; index++) {
            const data = this._cfg[type][index];
            if(MainUI.getInstance().getUnlockIndex()>=data.unlock&&Api.composemapVoApi.getMaxLv()>=data.plv)
            {
                let iconKey=data.key.toLowerCase();
                let iconBg=BaseBitmap.create("itembg_3");
                iconBg.setPosition(bg.x+31,cellH*idx+bg.y+82);
                this.addChildToContainer(iconBg);
                
                if(idx>0)
                {
                    let line=BaseBitmap.create("public_line4");
                    line.width=500;
                    line.x=this.viewBg.width*0.5-line.width*0.5;
                    line.y=iconBg.y-line.height*0.5-13;
                    this.addChildToContainer(line);
                }
                let res="go_"+iconKey;
                let scale=1;
                let offY=0;
                if(!ResourceManager.hasRes(res))
                {
                    res="composebiglv1";
                    scale=0.5;
                    offY=-27;
                }
                let icon=BaseLoadBitmap.create(res);
                icon.setPosition(iconBg.x+3,iconBg.y+3+offY);
                this.addChildToContainer(icon);

                let text=ComponentManager.getTextField(LanguageManager.getlocal(data.cnkey),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
                text.lineSpacing=3;
                text.setPosition(iconBg.x+iconBg.width+10,iconBg.y+10);
                this.addChildToContainer(text);

                let btn=ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskGoBtn",(key:string)=>{
                    if(Api[key+"VoApi"]&&Api[key+"VoApi"].go)
                    {
                        Api[key+"VoApi"].go();
                    }
                    else
                    {
                        if(key=="challenge")
                        {
                            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_SHOWUNLOCK);
                        }
                        else if(key=="composepersion"||key=="buypersion")
                        {
                            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND);	
                        }
                    }
                    this.hide();
                    ViewController.getInstance().hideView(ViewConst.COMMON.PLAYERVIEW);
                },this,[data.key]);
                btn.setPosition(bg.x+bg.width-btn.width-25,iconBg.y+(iconBg.height-btn.height)*0.5);
                this.addChildToContainer(btn);

                idx++;
            }
        }

    }
    
    protected resetBgSize():void
    {
        super.resetBgSize();
        this._lineBg.height=this.viewBg.height-110;
    }
}