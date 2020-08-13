namespace Config {
    export namespace SkillpassiveCfg {
        let skillLevyData: {[index: string]: SkillPassiveCfgItem} = {};
        export function formatData(data: any) {
            skillLevyData = {};
            for (let sid in data) {
                let _item = new SkillPassiveCfgItem();
                _item.skillId = sid;
                _item.skillType = data[sid].skillType;
                _item.attribute = data[sid].attribute;
                _item.value = data[sid].value;
                _item.quatily = data[sid].quatily;
                skillLevyData[sid] = _item;
            }
        }

        /**
         * 根据技能ID获取技能
         */
        export function getSkillPassiveById(skillId: string): SkillPassiveCfgItem {
            return skillLevyData[skillId];
        }
    }

    export class SkillPassiveCfgItem extends BaseItemCfg {
        /**技能ID */
        public skillId: string;
        /**--skillType  被动类型  1.每级别固定增加指定属性 2.恒定增加百分比 3.增加书院学习收益百分比 4.装备强化大师，获得经验时增加X%，5装备使用大师，可额外从指定类型装备获得X的额外收益。*/
        public skillType: number;
        /**对应属性  1武 2智 3政 4魅 */
        public attribute: number;
        /**品质 */
        public quatily: number;
        /**      --value  加成数值 */
        public value: number;

        /**技能名 */
        public get skillName(): string {
            return LanguageManager.getlocal("skillPassive_name" + this.skillId);
        }

        /**技能描述 */
        public get skillDes(): string {
            let _upNum = this.value <= 1 ? ((this.value * 100).toFixed(0)+'%') : this.value;
            return LanguageManager.getlocal("skillPassive_desc"+this.skillId, [_upNum.toString()]);
        }

        public get skillIcon():string{
            let str = '';
            if(this.attribute){
                str = `servant_passiveskill_icon` + this.attribute;
            }
            else{
                str = `servant_passiveskill_icon` + this.skillType;
            }
            return str;
        }
    }
}