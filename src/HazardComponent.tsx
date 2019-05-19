import React from 'react'
import { start } from 'repl';
import { safeContent } from './SafeContent';

interface ProductHazardWarningProps {
  hazardWarning?: string
}


export default class HazardComponent extends React.PureComponent<ProductHazardWarningProps> {
  public render() {
    const safeHazardWarning = safeContent(this.props.hazardWarning);
    return safeHazardWarning ? (
      <div dangerouslySetInnerHTML={{ __html: safeHazardWarning }} />
    ) : null
  }
}
