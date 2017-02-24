"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const typings = require("./tooltip.type");
const tooltip_style_1 = require("./tooltip.style");
class ToolTip extends React.Component {
    constructor() {
        super(...arguments);
        this.state = new typings.State();
        this.showTooltipPosition = () => {
            const childrenBoundingClientRect = this.childrenDom.getBoundingClientRect();
            const tooltipSpanDom = this.tooltipDom.childNodes[0];
            const tooltipSpanBoundingClientRect = tooltipSpanDom.getBoundingClientRect();
            this.setState({
                childrenLeft: childrenBoundingClientRect.left + document.body.scrollLeft,
                childrenTop: childrenBoundingClientRect.top + document.body.scrollTop,
                childrenWidth: childrenBoundingClientRect.width,
                childrenHeight: childrenBoundingClientRect.height,
                tooltipWidth: tooltipSpanBoundingClientRect.width,
                tooltipHeight: tooltipSpanBoundingClientRect.height,
                show: true
            });
        };
        this.handleChildrenClick = (event) => {
            if (this.props.type !== 'click') {
                return;
            }
            if (!this.state.show) {
                this.showTooltipPosition();
            }
            else {
                this.handleClose();
            }
        };
        this.handleChildrenMouseOver = (event) => {
            if (this.props.type !== 'hover') {
                return;
            }
            this.showTooltipPosition();
        };
        this.handleChildrenMouseLeave = (event) => {
            if (this.props.type !== 'hover') {
                return;
            }
            this.handleClose();
        };
        this.handleClose = () => {
            this.setState({
                show: false
            });
        };
        this.setPosition = (toolTipStyle, position) => {
            switch (position) {
                case 'left':
                    toolTipStyle.left = this.state.childrenLeft - this.state.tooltipWidth - 7;
                    toolTipStyle.top = this.state.childrenTop - (this.state.tooltipHeight / 2 - this.state.childrenHeight / 2);
                    break;
                case 'top':
                    toolTipStyle.left = this.state.childrenLeft + this.state.childrenWidth / 2 - this.state.tooltipWidth / 2;
                    toolTipStyle.top = this.state.childrenTop - this.state.tooltipHeight - 7;
                    break;
                case 'right':
                    toolTipStyle.left = this.state.childrenLeft + this.state.childrenWidth + 7;
                    toolTipStyle.top = this.state.childrenTop - (this.state.tooltipHeight / 2 - this.state.childrenHeight / 2);
                    break;
                case 'bottom':
                    toolTipStyle.left = this.state.childrenLeft + this.state.childrenWidth / 2 - this.state.tooltipWidth / 2;
                    toolTipStyle.top = this.state.childrenTop + this.state.childrenHeight + 7;
                    break;
            }
        };
        this.renderTooltip = () => {
            let toolTipStyle = {
                zIndex: this.props.zIndex,
                backgroundColor: this.props.simple ? 'transparent' : null
            };
            let position = this.props.position;
            this.setPosition(toolTipStyle, position);
            if (toolTipStyle.left < 0) {
                this.setPosition(toolTipStyle, 'right');
                position = 'right';
            }
            if (toolTipStyle.right > window.outerWidth) {
                this.setPosition(toolTipStyle, 'left');
                position = 'left';
            }
            if (toolTipStyle.top < 0) {
                this.setPosition(toolTipStyle, 'bottom');
                position = 'bottom';
            }
            if (toolTipStyle.top > window.outerHeight) {
                this.setPosition(toolTipStyle, 'top');
                position = 'top';
            }
            const TooltipElement = (React.createElement(tooltip_style_1.Container, { theme: { show: this.state.show, simple: this.props.simple, position }, style: toolTipStyle }, this.props.title === '' ? this.props.titleRender() : this.props.title));
            const TooltipShadowElement = (React.createElement(tooltip_style_1.Shadow, { theme: { show: this.state.show, zIndex: this.props.shadowZIndex }, onClick: this.handleClose }));
            ReactDOM.render(TooltipElement, this.tooltipDom);
            if (this.props.showShadow) {
                ReactDOM.render(TooltipShadowElement, this.tooltipShadowDom);
            }
        };
    }
    componentDidMount() {
        this.childrenDom = ReactDOM.findDOMNode(this.childrenRef);
        this.childrenDom.addEventListener('mouseover', this.handleChildrenMouseOver);
        this.childrenDom.addEventListener('mouseleave', this.handleChildrenMouseLeave);
        this.childrenDom.addEventListener('click', this.handleChildrenClick);
        this.tooltipDom = document.createElement('div');
        document.body.appendChild(this.tooltipDom);
        if (this.props.showShadow) {
            this.tooltipShadowDom = document.createElement('div');
            document.body.appendChild(this.tooltipShadowDom);
        }
        this.renderTooltip();
    }
    componentWillUnmount() {
        this.childrenDom.removeEventListener('mouseover', this.handleChildrenMouseOver);
        this.childrenDom.removeEventListener('mouseleave', this.handleChildrenMouseLeave);
        this.childrenDom.addEventListener('click', this.handleChildrenClick);
        document.body.removeChild(this.tooltipDom);
        if (this.props.showShadow) {
            document.body.removeChild(this.tooltipShadowDom);
        }
    }
    componentDidUpdate() {
        this.renderTooltip();
    }
    render() {
        const children = React.cloneElement(React.Children.only(this.props.children), {
            ref: (ref) => {
                this.childrenRef = ref;
            }
        });
        return children;
    }
}
ToolTip.defaultProps = new typings.Props();
exports.default = ToolTip;
//# sourceMappingURL=tooltip.component.js.map