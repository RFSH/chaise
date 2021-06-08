import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    link: PropTypes.string,
    addLink: PropTypes.bool,
    displayname: PropTypes.shape({
        isHTML: PropTypes.bool,
        value: PropTypes.string
    }),
    comment: PropTypes.string,
    reference:  PropTypes.any
};

type DisplaynameProps = PropTypes.InferProps<typeof propTypes>;

const Displayname: React.FC<DisplaynameProps> = (props: DisplaynameProps) => {
    let link = props.link, addLink = props.addLink;
    if (typeof link === "string") {
        addLink = true;
    }
    if (props.reference && typeof link != "string") {
        link = props.reference.unfilteredReference.contextualize.compact.appLink;
    }

    let displayname = props.displayname;
    if (props.reference && typeof displayname !== "object") {
        displayname = props.reference.displayname;
    }

    const renderDisplayname = () => {
        if (displayname?.isHTML) {
            return (
                <span
                    dangerouslySetInnerHTML={{__html: displayname.value}}>
                </span>
            )
        }
        return <span>{displayname?.value}</span>
    }

    if (addLink) {
        return (
            <a href={link}>
                {renderDisplayname()}
            </a>
        )
    }

    return renderDisplayname()
}

Displayname.propTypes = propTypes;

export default Displayname;
