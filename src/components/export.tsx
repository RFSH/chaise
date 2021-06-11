import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const propTypes = {
    reference:  PropTypes.any,
    disabled: PropTypes.bool,
    csvOptionName: PropTypes.string
};

type ExportProps = PropTypes.InferProps<typeof propTypes>;

const Export: React.FC<ExportProps> = (props: ExportProps) => {
    console.log("props are: ", props);

    const onSelect = (pl: string) => {
        console.log(pl);
    }

    const renderDropdownOptions = () => {
        return ["This record (CSV)", "BDBag"].map((pl) => {
            return (
                <Dropdown.Item key={pl} onClick={() => onSelect(pl)}>
                    <span>{pl}</span>
                </Dropdown.Item>
            )
        })
    }

    const renderDropdown = () => {
        return (
            <DropdownButton
                style={{display: "inline-block !important"}}
                disabled={props.disabled}
                title="Export"
                className="chaise-dropdown"
            >
                {renderDropdownOptions()}
            </DropdownButton>
        )
    }

    return renderDropdown();
}

Export.propTypes = propTypes;

export default Export;
