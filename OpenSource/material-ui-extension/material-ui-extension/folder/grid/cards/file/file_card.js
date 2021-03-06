// @flow
import React, { Component, PropTypes } from 'react';
import FileViewEntity from '../../../entity/file_view_entity';
import Checkbox from 'material-ui/Checkbox';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import HoverablePaper from '../../../../paper/hoverable_paper';
require('./file_card.scss');
/**
 * 组件FileCard,文件卡片
 */
export default class FileCard extends Component {

  static propTypes = {
    //文件实体类
    file: PropTypes.instanceOf(FileViewEntity),
    //模式
    mode: PropTypes.oneOf(['full', 'select']),
    //外部传入的文件是否被选中
    selected: PropTypes.bool,
    //文件选择事件
    onSelect: PropTypes.func
  };

  static defaultProps = {
    file: new FileViewEntity(),
    mode: 'full'
  };

  /**
   * @function 默认构造函数
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    }
  }

  /**
   * @function 组件挂载完成回调
   */
  componentDidMount() {

  }

  /**
   * @function 默认渲染函数
   */
  render() {


    const file: FileViewEntity = this.props.file;

    let {mode} = this.props;

    //判断是否允许操作
    let iconMenu = '';

    if (mode === 'full') {
      iconMenu = <IconMenu
        onTouchTap={event => event.stopPropagation()}
        className='icon_menu'
        onItemTouchTap={this.itemTouchTap}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      >
        <MenuItem key={1} primaryText="重命名"/>
        <MenuItem key={2} primaryText="移动至"/>
        <MenuItem key={3} primaryText="下单生产"/>
        <MenuItem key={4} primaryText="删除"/>
      </IconMenu>;
    }

    return <section className="file_card__container">
      <HoverablePaper>
        <div className="content">
          <div className={`checkbox ${this.state.hover || this.props.selected ? 'checkbox--selected' : ''}`}>
            <Checkbox
              id="checkbox"
              checked={this.props.selected}
              onCheck={this.props.onSelect}
              onTouchTap={event => event.stopPropagation()}
            />
          </div>

          <div className="cover" style={{backgroundImage:`url(${file.cover})`}}/>

          <div className="bottom">

            <div className="info">

              <div className="name">{file.name}</div>

              <div className="date">{file.date}</div>

            </div>
            <div className="menu">
              {iconMenu}
            </div>
          </div>


        </div>
      </HoverablePaper>
    </section>

  }

}

