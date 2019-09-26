import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tt from 'counterpart';

class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            value: this.props.value,
            active: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({ ...this.state, value: nextProps.value });
        }
    }

    handleFocus = e => {
        this.setState({ focus: true });
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    };

    handleBlur = e => {
        this.setState({ focus: false });
        if (this.state.value.trim().length === 0) {
            this.setState({ value: '' });
        }
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    };

    handleInput = e => {
        this.setState({ value: e.target.value });
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    };

    handleCancel = () => {
        this.setState({ active: false, value: '' });
        if (this.props.onCancelSearch) {
            this.props.onCancelSearch();
        }
    };

    handleKeyUp = e => {
        if (e.charCode === 13 || e.key === 'Enter') {
            this.handleRequestSearch();
        } else if (
            this.props.cancelOnEscape &&
            (e.charCode === 27 || e.key === 'Escape')
        ) {
            this.handleCancel();
        }
        if (this.props.onKeyUp) {
            this.props.onKeyUp(e);
        }
    };

    handleRequestSearch = e => {
        if (e) e.preventDefault();
        if (this.props.onRequestSearch) {
            this.props.onRequestSearch(this.state.value);
        }
    };

    render() {
        const { value } = this.state;
        const {
            cancelOnEscape,
            className,
            classes,
            closeIcon,
            disabled,
            onCancelSearch,
            onRequestSearch,
            searchIcon,
            style,
            ...inputProps
        } = this.props;

        var icon = this.state.focus ? null : (
            <svg
                className="search-input__icon"
                width="42"
                height="42"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g>
                    <path
                        className="search-input__path"
                        d="M14.3681591,18.5706017 L11.3928571,21.6 L14.3681591,18.5706017 C13.273867,17.6916019 12.5714286,16.3293241 12.5714286,14.8 C12.5714286,12.1490332 14.6820862,10 17.2857143,10 C19.8893424,10 22,12.1490332 22,14.8 C22,17.4509668 19.8893424,19.6 17.2857143,19.6 C16.1841009,19.6 15.1707389,19.215281 14.3681591,18.5706017 Z"
                        id="icon-svg"
                    />
                </g>
            </svg>
        );
        return (
            <span>
                <form
                    className={'search-input'}
                    method="post"
                    onSubmit={this.handleRequestSearch}
                >
                    {icon}
                    <input
                        className="search-input__inner"
                        type="search"
                        placeholder={tt('g.search')}
                        onChange={this.handleInput}
                        onKeyUp={this.handleKeyUp}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                    />
                    {/*<button
                        className="input-group-button"
                        href="/static/search.html"
                        type="submit"
                        title={tt('g.search')}
                    />*/}
                </form>
            </span>
        );
    }
}

SearchInput.defaultProps = {
    className: '',
    disabled: false,
    placeholder: 'Search',
    style: null,
    value: '',
};

SearchInput.propTypes = {
    /** Whether to clear search on escape */
    cancelOnEscape: PropTypes.bool,
    /** Override or extend the styles applied to the component. */
    classes: PropTypes.string,
    /** Custom top-level class */
    className: PropTypes.string,
    /** Override the close icon. */
    closeIcon: PropTypes.node,
    /** Disables text field. */
    disabled: PropTypes.bool,
    /** Fired when the search is cancelled. */
    onCancelSearch: PropTypes.func,
    /** Fired when the text value changes. */
    onChange: PropTypes.func,
    /** Fired when the search icon is clicked. */
    onRequestSearch: PropTypes.func,
    /** Sets placeholder text for the embedded text field. */
    placeholder: PropTypes.string,
    /** Override the search icon. */
    searchIcon: PropTypes.node,
    /** Override the inline-styles of the root element. */
    style: PropTypes.object,
    /** The value of the text field. */
    value: PropTypes.string,
};

export default SearchInput;
