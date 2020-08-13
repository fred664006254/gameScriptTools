/**
 * 门客羁绊buff
 */

class ServantJibanBuffItem extends ScrollListItem
{
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:number,param:string)
    {
        //App.Messag
        let view = this;
        //eHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.useBtnHandlerCallBaclk,this);
        view.width = 526;
        let isActive = Api.servantVoApi.isBuffActive(param, data);
        view.height = isActive ? 290 : 198;


        /**
         * --combinationDetail  组合元素
        --attributeType  加成属性类型  1.擂台中增加攻击 2擂台中增加血量
        --addValue  羁绊加成值
        --needAbility  所需等级
        
        ["10011"]={       ----元芳----
            ["combinationDetail"]={"1001","1002","1003","1004","1005"},
            ["attributeType"]=1,
            ["addValue"]={0.05,0.1,0.15},
            ["needAbility"]={100,200,300},
        },
        */
        let cfg = Config.ServentcombinationCfg.getCombineInfoById(param, data)

        let proNumBg = BaseBitmap.create("public_ts_bg01"); 
        proNumBg.width = 228;
        view.addChild(proNumBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, proNumBg, view, [0,0], true);

        let curBuffLv = Api.servantVoApi.getServantActiveBufflv(param, data);
        let namtxt = ComponentManager.getTextField(LanguageManager.getlocal(`servant_combinebuff_${param+data}`),22, 0x420E00);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, namtxt, proNumBg);
        view.addChild(namtxt); 

        let activeTxt = ComponentManager.getTextField(LanguageManager.getlocal(isActive?`servantJibanActive`:`servantJibanDeActive`),20,isActive?0x359270:0xAC0101);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, activeTxt, proNumBg, [proNumBg.width+5, 0]);
        view.addChild(activeTxt); 

        let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(`servantJibanDesc${cfg.attributeType}`, [(cfg.getAddValueByLv(curBuffLv) * 100).toFixed(0)]), 20, 0x420E00);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt, proNumBg, [0,proNumBg.height+9]);
        view.addChild(descTxt); 

        let group = new BaseDisplayObjectContainer();
        group.height = 90;
        let arr = cfg.combinationDetail;
        let canActive = true;
        let needlv = cfg.getAbilityByLv(curBuffLv);
        let ismax = curBuffLv == cfg.getMaxLv();
        for(let i = 0; i < arr.length; ++ i){
            let servant = arr[i];
            let cfg = Config.ServantCfg.getServantItemById(arr[i]);
            let sgroup = new BaseDisplayObjectContainer();
            sgroup.width = sgroup.height = 90;
            sgroup.setPosition(i * 103, 0);
            group.addChild(sgroup);
            sgroup.addTouchTap(()=>{
                if(!obj){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`servantJibanNotHave`));
                    return;
                }
                let openview = ViewController.getInstance().getView(ViewConst.POPUP.SERVANTJIBANBUFFPOPUPVUEW);
                if(arr[i] !== param){
                    App.MessageHelper.dispatchEvent(MessageConst.SERVANT_CHANGE,{sid : arr[i]})
                }
                if(openview){
                    openview.hide();
                }
            },view);
            
            let obj = Api.servantVoApi.getServantObj(arr[i]);

            let qualitybg = BaseLoadBitmap.create(`servant_cardbg_${obj ? obj.clv : cfg.quality}`);
            qualitybg.width = qualitybg.height = 184;
            qualitybg.setScale(90/184);
            sgroup.addChild(qualitybg);

            let halficon = BaseLoadBitmap.create(cfg.halfIcon);
            halficon.width = 180;
            halficon.height = 177;
            halficon.setScale(90/180);
            sgroup.addChild(halficon);

            
            if(!obj){
                App.DisplayUtil.changeToGray(sgroup);
                canActive = false;
            }
            else{
                if(obj.getTotalBookValue() < needlv){
                    canActive = false;
                }
            }

        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, group, descTxt, [0,descTxt.height+10]);
        view.addChild(group); 

        let line = BaseBitmap.create(`public_line4`);
        line.width = 500;
        view.addChild(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, group, [0,group.height+13]);

        if(isActive){
            view.height = 218;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, view, [0,0], true);
            //后续可升级
            // if(canActive){
            //     let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `servantJibanUnlock`, ()=>{}, null);
            //     view.addChild(btn);
            //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, group, [0,group.height+10]);
            // }
            // else{
            //     let nextLevelTxt = ComponentManager.getTextField(`${LanguageManager.getlocal(`skinnextLv`)}：`, 20, 0x420E00);
            //     view.addChild(nextLevelTxt);
            //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, nextLevelTxt, group, [0,group.height+9]);
    
            //     let desc2Txt = ComponentManager.getTextField(LanguageManager.getlocal(`servantJibanDesc`), 20, 0x420E00);
            //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, desc2Txt, nextLevelTxt, [0,nextLevelTxt.height+10]);
            //     view.addChild(desc2Txt); 
            // }
            // let need = 400;
            // let cur = 250;
            // let tipTxt = ComponentManager.getTextField(`${LanguageManager.getlocal(`组合内门客总等价达到{1}/{2}级时解锁`, [cur+'',need+''])}`, 20, canActive ? 0x359270 : 0xAC0101);
            // view.addChild(tipTxt);
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipTxt, line, [0,line.height+4]);
        }
        else{
            if(canActive){
                view.height = 256;
                let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `servantJibanUnlock`, ()=>{
                    NetManager.request(NetRequestConst.REQUEST_SERVANT_ACTIVECOMB, {
                        servantId : param,
                        combinationId : param+data
                    })
                }, view);
                view.addChild(btn);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, group, [0,group.height+10]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, btn, [0,btn.height+10]);
            }
            else{
                view.height = 236;
                let tipTxt = ComponentManager.getTextField(`${LanguageManager.getlocal(`servant_combinebuffneed`, [needlv+''])}`, 20, 0xAC0101);
                view.addChild(tipTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, group, [0,group.height+10]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, tipTxt, [0,tipTxt.height+10]);
            }
        }
    }

    //升级后界面刷新
    private afterLvUp():void{

    }

    public dispose():void
    {
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.useBtnHandlerCallBaclk,this);
        super.dispose()
    }
}