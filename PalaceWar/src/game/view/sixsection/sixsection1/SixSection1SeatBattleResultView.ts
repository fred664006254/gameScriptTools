/**
* 席位抢夺战斗结果
* date 2020.
* author ycg
* @name SixSection1SeatBattleResultView
*/
class SixSection1SeatBattleResultView extends CommonView{

    public constructor() {
        super();
    }

    protected getBgName():string{
        return "";
    }

    protected getTitleStr():string{
        return null;
    }

    protected getTitleBgName():string{
        return "";
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getRuleInfo():string{
        return ""
    }

    protected getProbablyInfo():string{
        return ""
    }

    protected getCloseBtnName():string{
        return null;
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            
        ).concat(list);
    }

    public initView():void{
        let bg = BaseBitmap.create("public_9_wordbg");
        bg.touchEnabled = true;
        bg.width = GameConfig.stageWidth;
        bg.height = 230;
        this.addChildToContainer(bg);
        bg.y = GameConfig.stageHeigth/2 - bg.height/2;

        let win = this.param.data.winflag;
        let titleBgImg = "sixsection1_battlewintxt";
        if (win == 2){
            titleBgImg = "sixsection1_battlelosetxt";
        }
        let titleBg = BaseBitmap.create(titleBgImg)
        titleBg.setPosition(bg.x + bg.width/2 - titleBg.width/2, bg.y - titleBg.height/2);
        this.addChildToContainer(titleBg);

        //成功失败提示
        App.LogUtil.log("buildName "+this.param.data.index);
        let buildName = LanguageManager.getlocal("sixSection1BuildName"+(this.param.data.index+1));
        let successTipStr = LanguageManager.getlocal("sixSection1HoldSeatBattlefailTip", [buildName]);
        if (win == 1){
            successTipStr = LanguageManager.getlocal("sixSection1HoldSeatBattleSuccessTip", [buildName, ""+this.param.data.point]);
        }
        let successTip = ComponentManager.getTextField(successTipStr, TextFieldConst.FONTSIZE_CONTENT_COMMON , TextFieldConst.COLOR_WHITE);
        successTip.width = bg.width - 20;
        successTip.anchorOffsetX = successTip.width/2;
        successTip.textAlign = TextFieldConst.ALIGH_CENTER;
        successTip.setPosition(bg.x + bg.width/2, bg.y + 60);
        successTip.lineSpacing = 7;
        this.addChildToContainer(successTip);

        let enterBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW , "sysConfirm", ()=>{
            if (this.param.data.f){
                this.param.data.f.apply(this.param.data.o);
            }
            this.hide();
        }, this);
        enterBtn.setPosition(bg.x + bg.width/2 - enterBtn.width/2, bg.y + bg.height - enterBtn.height - 25);
        this.addChildToContainer(enterBtn);
    }

    public dispose():void{
        
        super.dispose();
    }
}