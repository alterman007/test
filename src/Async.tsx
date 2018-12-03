import * as React from 'react';
import * as Loadable from 'react-loadable';

const LoadableHello = Loadable({
  loader: () => import('./Hello'),
  loading: Loading,
});

export default LoadableHello;

function Loading(props: Loadable.LoadingComponentProps) {
  if (props.isLoading) {
    if (props.timedOut) {
      return <div>Loader timed out!</div>;
    } else if (props.pastDelay) {
      return <div>Loading...</div>;
    } else {
      return null;
    }
  } else if (props.error) {
    return <div>Error! Component failed to load</div>;
  } else {
    return null;
  }
}

// function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
