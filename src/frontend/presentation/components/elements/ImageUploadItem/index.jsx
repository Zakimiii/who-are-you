import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as appActions from '@redux/App/AppReducer';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import { ClientError } from '@extension/Error';
import tt from 'counterpart';
import Ripple from '@elements/Ripple';
import classNames from 'classnames';
import data_config from '@constants/data_config';
import { FileEntity, FileEntities } from '@entity';
import { fromJS, Map, List } from 'immutable';
import Img from 'react-image';

class ImageUploadItem extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        values: PropTypes.instanceOf(Map),
        onChange: PropTypes.func,
        ref: PropTypes.string,
        limit: PropTypes.number,
        repository: PropTypes.instanceOf(FileEntities),
    };ƒ

    static defaultProps = {
        limit: 1,
        className: '',
    };

    state = {
        repository: Map({
            items: [],
        }),
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'ImageUploadItem'
        );
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        const { values } = this.props;

        if (values) {
            this.setState({
                repository: values,
            });
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const { values } = nextProps;

        if (values) {
            this.setState({
                repository: values,
            });
        }
    }

    onChange(e) {
        const { onChange, limit, addError } = this.props;

        const { files } = e.target;

        let { repository } = this.state;

        repository = repository.toJS();

        repository.items =
            limit == 1
                ? Array.from(files).map(file =>
                      new FileEntity({ file }).toJSON()
                  )
                : repository.items.concat(
                      Array.from(files).map(file =>
                          new FileEntity({ file }).toJSON()
                      )
                  );

        if (repository.items.length > limit - 1) {
            addError(
                new ClientError({
                    error: e,
                    tt_key: 'errors.is_limit',
                    tt_params: { data: 'g.image', limit },
                })
            );
        }

        this.setState({
            repository: Map(repository),
        });

        onChange && onChange(Map(repository));
    }

    render() {
        const { values, ref, type, className } = this.props;

        let { repository } = this.state;

        repository = repository.toJS();

        const renderItems = items =>
            items.map((item, key) => (
                <div key={key} className="image-upload-item__preview">
                    <Img
                        className="image-upload-item__preview-image"
                        src={item.url}
                        style={{ width: '120px', height: '120px' }}
                        alt={tt('alts.default')}
                    />
                </div>
            ));

        return (
            <div className={classNames('image-upload-item', className)}>
                <Ripple>
                    <label className="image-upload-item__title">
                        {tt('g.choose_image')}
                        <input
                            className="image-upload-item__field"
                            type={'file'}
                            ref={ref}
                            onChange={this.onChange}
                            accept="image/*"
                        />
                    </label>
                </Ripple>
                {repository && (
                    <div className="image-upload-item__previews">
                        {renderItems(repository.items)}
                    </div>
                )}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({
        addError: error => {
            appActions.addError({ error });
        },
    })
)(ImageUploadItem);
