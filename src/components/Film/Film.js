import { getFilmInfo } from "../../utils/API";
import React, { Component } from "react";
import styles from "./Films.module.css";
import { NavLink, Route } from "react-router-dom";
import Loader  from "../Loader/Loader";

const Review = React.lazy(() => import('../Review/Review'));
const Cast = React.lazy(() => import('../Cast/Cast'));

export default class Film extends Component {
  state = {
    singleUser: {},
    loaded: false,
  };
  componentDidMount() {
    getFilmInfo(this.props.match.params.id).then((data) =>
      this.setState({
        singleUser: data.data,
        loaded: true,
      })
    );
  }
  returnToHome = () => {
    this.props.history.replace("/");
  };
  goBack = () => {
    this.props.history.push("/");
  };
  render() {
    const {
      genres,
      original_title,
      release_date,
      runtime,
      vote_average,
      overview,
      poster_path,
    } = this.state.singleUser;
    const { match } = this.props;
    return (
      <>
        {this.state.loaded ? (
          <>
            <button className={styles.btn} onClick={this.goBack}>
              Go home
            </button>
            <div className={styles.first}>
              <div className={styles.contentBlock}>
                {poster_path !== null ? (
                  <img
                    className={styles.img}
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    alt="xx"
                  />
                ) : (
                  <img
                    className={styles.img}
                    src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAAETCAMAAABDSmfhAAAAeFBMVEUAAAD////c3NzQ0NBhYWH7+/s3Nzfj4+Pr6+vV1dXBwcGYmJhsbGx7e3uSkpKenp5NTU2srKx1dXWysrKEhIT19fWlpaVmZmYfHx9GRkZXV1e7u7vLy8vf399/f3+JiYkUFBQmJiY5OTkvLy9CQkIjIyNSUlIMDAwu55jsAAAPV0lEQVR4nO2dC5eqLBSGxTSvWWnaRUu7zPT//+EHbhAQLZuxsbM+3rXOnLyUjwgb2GzQMLS0tLS0tCQdvvdTI/xINlpOjfAD7YwM7eZTU7yuPbIROk5N8boux+iY+VNT/ESWOzXBj5QkjvkPGpS7Mze/i6kpXtOXYRYGyk5eYjn/UJL76GynRuwlHraFpxJ9Tw00RBYqI8cwVqFxjQyjPBgl2nve1FTPtHW+na1h+V6e4mTfh8fCzK6GZ1rJ1GSPdA3DtKoSM7sZRrHC6e3jD3FhxsYSGaup6foVIGNXeNv6c7zEW2b9cZc5C2ODqunAHmqFzkbiWHTrPqtO85wdW5r7c/yZ9ZB1iC3nZPgp3U4O7jaGj/fUMvz1ZbnfTUbXryBaFnfjjtAatjdRENH2YIFmOOOYlRdPh9evVYb/XBFyYDNBCMGnCiGSRXYfaA3DxKX2gnAHG+PrjFM+MfbG99K6IZLeRFtn/Vn1Z45pceYtPd9EZopQXqGFiXCVucepjlN+E+BK6P6Ftz4rqxzQaZHjWr3RHCEvRGi5rrfslGSVrVshe2pSWbsUp7NBmZdlinY2cpcIBWs0M+nuOEMO+rB6c7socClEtnX2EW68bnLDjCO0SoIb7vIcESoDhA4OQtWHcRtFsnRvKTGBJElrO50gWlR9hC2NizNJ4geflb2J/QuN3YJYwpRm4R1imSLFxwzn63o30Od1OGe0FscmI13cja8Sd+dRgHccXIQioyLHSjQdX582qO6UzV0wIOTfDP9xU7KZ3upjKH/8G1MIZ4s0X+PSmXx/z5BnuDixXWQtUBrvcdoX5SZH6LMqHRBJWGwxSBY3bBub8i1ulxQzRBqIOPP4JNknRuzSLiXlEKGTUaf9uUBujE2jj0pyFH/Cye1eJobs0C3fIlQccaHcn/AtbJw6n0fkCawOHjJxeoeL09SUqi6kujzMa9rU85OgLDdltFz7JimjKMQNxTLfTk3ZocWxRvY3e6OyTtE6930/Xwcb68s4BLP6frKpGTt1s+31rVokDmrLSeKvbcEasx+n8y5QmZnMGNeXn6qy6OX2FlPDPdYhKNw28zH5tOZUj84rK1xsyrI8xdbqPDWNlpaWlpaWlpaWlpaWlpbWP6jL1rKs7VXYc7OIwi/D+LZUEQfVXt29rf6YG8ZVBcfTHvw6ZITEbDt7sMiwWpcHiww7rIVt13+vM2vZ4r7CZWt/pdfD7Xfsv7W4sezy77h39ZgTgqCeX3Kjd3prW9zgB6Tjf69wt/MJ6H1hHjJ37adH6V3k9kUVVcNdSPvnDfcyXiwWmQ3g6z/hhiEEm1kX4Fa/A9xqIDhwW+JJ6KqcNY5E7hwu1UTXAXelfMdvcoYs4N5KZ70r6EDgpqEmVnPsd9wV5Ll3QBsidwDYIT/2O26a697kKm+4T4At2txfcudyrhtXjHsL2NJ0kcfl8qbs/3vukNbucikC7tNCUMy5I3H/ooMb6oI3xUUCdwTmthUC01HvpJxblsq9/YNyCWrXbh3cbg+3rXDTFsO7Kh6Ruz2I+jNusKMhrTDfFT4rcjvPuQfkE6/AYuOdb5sWBtx0LLuVUYA7EZVx7lw6wLlFva9BSO0J7QrIBfOxHVQDZhTuN86ZAe6YtgTlYvSzeqeRvXkXtCHUlzRHBsKxn3HbtRz/veP3DXdFDYAQd/Qz7sP7YAXxdtWNPl4eePTL9slbJbRjDxR8pPb3eyX2G0IKznoywK2G9AxsV71VUj+tBO6UVnLA/b0S9M25Q2l/NSU36/L8qj8/BTfrYjovc3P/ySTctHMFNf6/xG3Qpor/IjfPJ2HPlcbVyZvNZp4l7ClmRCau7tberC2vIvfasZ/YoLL+rb+pd7S0tLS0tLS0tLS0/k67wybIorBvFiXpqw9eaWtfd+0V/0T13XgCRtKdT4ZK864BpAs5pMyPj1Gaprbq2oYRBmXkj/p6R2I2YLkHQZ7qyYGeZDseI673qtwu75oKYm6wsai3ttK5baPQYJT2IidPuFtDf8643EFHp7w9PsAeSMsl/IxbWsKtZL89DvYSdcoUz6nY3tbAzzNuyRXRPNVRsBdNCp9IMTpkaccl+ZoWsi/nKbcwaMnL0BjYZ/ZEuf2DfCMNbfQ8hufcKGK7Lvw3xuCm3jRpWHtvtyyHWAIk6/uc22bOZ3NU7u8ObJI2kbQNWQduUSqwz7nZT8doVG6oCdrDrIYcU1TSk+Cqom1/zA0FEX4rFfaMwA0oT1ZIAIoTLVliZfKYO+APCIyWORuJ24Kfe3wSwGHL8AV3eW4f6uOmlu/QfPPSN377qiBFoscnOc1JSoDXE+4Ny4UFfVLmSNzw5B8H4sAzqZtU+3a5esJN/1/Q0r8bjbsQSk6fTIENnjNfmeAZN9yzC08sMP6SewVpBWZYSPtB3OJABWmTjZtPHjbkwQSwKIMm5QZy3zi3NSJ3JGN0iF6Y2RBozTStjqfcbFiOmsOxuKElr1Q7gtomBIhY4+U5945xX8fkphbW6j1+Rp1i/Yfn3KyZDGV5NO5cfu5MTQhHojLXigdzQw1PrzAaN21dtsKIwqYK7cFmWWsIdx22uhiZm42cKq08CAzLVGIqazA32WD9tfG4We8p5d2bnN9JLzZ9IMCt2iOJ2+JtyBG5mXMAuZl1md8WzdB1xMxkK/fTvuY353ZNQcekzW14zUpiI3LzDqYskuWh0dx2mvjNcak3wOQp3PumBTkmdxPcI4kk0akruRtfyqWHe6Zwc43KbVzVBYfq8g9XV1u5rFU6NbdhbORVe/LK4FDq2bQ5ex6aT97HjTOLz/wmxyXNjvmRFLOuTkV9xInI0qtmW3W5LOpPfV8ckxurOsSnUPVoamlpfZYCLObyXpURC/S61R/PlznRZXeHD3PcvMR/3zV/7hVBhUncWYfaJKd1fVQ3ytM564ItadcZ0fOd6V8Ug6E2JqnpcVvAjMiCeFH9OSgdz4i8mYvcmRdjbhKyV5DzZzP7A1YIrVugKToYtJEdE19izucQ5HX/69B4Juq68K8C1h+o9mWZKI5YByjHDa6AN9b9+hZa3HbHRI0/Fmn1Xet1V2nfICRdYrLeN2wzbjKMmR7J+UnivHPyyECRucM2binNWKtwW3flSfirSzxYDXddUmm5fNtM4uFiDbwlm4iUUPf3xq7x1HwSnj4gmxCOFbHHZzq75FCXORKJXNZ30pW/4w9YT7sZiihxPyEMkzoTWOSjW1uSJp9YYRhuyfl3WjinFfeNx3bT+QEPVN26lvI3otwzNPnqpknO6744W1Oe+2m9htq/zMn/F5hYh28hzzH3Nn/nchBaWlpab1Zoelim6I7YkF1maxLRNSocbNJTMxHjVK71t9syv97PDUO80pCPMiEJm2hxIpK9bqaYC0Emov5g8WfKLXoFFe6rMn2KnT09t3CtNneXU9D8GG4+g77FHXWipdWHcHNQmZufMMuWy7xx5NZDg194FxHEWdgBbGXVX3I3rVGJmw1cN0tp3djAitQ7q1uPf9mvF7hZ81/idlXIgzpvfVJuFisoctOYS7kLeQbXuYg5EbcngojcrpoljKY4Cs3uibg3dAGOepfADfEn6oR0upYH3zERd0QDuVYcinsGu95EAlm8krcn4KYj3LVxE7hh4K3DHOdi2TUm5GYhgIbEnfbhtAfqp+OmWXkucsMQd9eSfDA0yN+MNR03Hc42RW4I3ula8gaqI+7wmZCbBkNsBO57b3qvBPtDNCU3XaeNBnXy/N311sVNUxpAU3LTUWm/5NywpyMMGIbseddnUm5aDc44d9Yqfkw0ao3vmJRbClOquekIlOIoztsZf1puNu+p4aaLRLUjA+jSf0IPeWLuQ5ubEsomhZp68W4m5hYWCpEWOpVeqsdmbYijaFNzV21utrgVyqlVObGemtQmn5qb9yNYm2nV3IntFcWx2ZJr0cm5m3k3TVtPyPOCWpX/9NzzNrdxUV6hpo79Tc/NjPhC3dXIVSLf/5wbKnUpchSMuPR2y/tasOxmx3p3cOS9qJKuB6KruqvdyTksfdN1ZsmpM96k/srk4QVaWlpaWlpaWlpaWv8vXeeKWu4+a5nPzCKJ2m7X7TIIgqV8ckX2BRDLWX9cqt+AWJZA1EbpPj1VR2dc7Ad++3yxnzST3l0Ag2nyYrYw7la73ajbSlzaQ1z+tn1N58kqCW2pc9EE7vOsdUQc8utaPFgYOWFxEkLfPhO41bWPXntb1iPuUj2U8oilgdzCmkuPuV976dQDbvWtC0TNZO+B3MJo4DNuZV2pp9zyXLg2dmqaR34d5k4Yys3fN6Vwp7vaDmzX7NeHz7FzxBQW1XgwM/CIHBof8vlF7mYioMrdfJGtPjX4rVN93HQWqzh4c6O2R3oeA7ibwIgH3I1fd+jbhPq4C/mSIGpe4he50ddzbjb7dGjZ7OGm8UftqfDg33aHc4PfsBjAzcZHB86G6OHOxRzBdYbftgZzn2zhCT3mponSERXyArfdk9mEEcth3BAZYQ/hhvGsgSYFuLO1oIBlto6fuPKMMoh7Q5eYyQdwUw/1K9ySHBY/0vXI+NTsgdzUMB0GcA9ZXugB95E1irpeOMNf5TGQm/6WO4AbjvevvvKcu//FBfydbUO56SPKhnIPe11Cdz7p/wXg7nt5Ryc3Xa7q9ob0XmwExV3DUUxQzL6aq3RxFzI3vVdnYP4eNj222w5a/Pot1QdsDiaXARglTFrc1KqWyyfcr9uTbjxUKftP/IZClm0FCQu3iNywNomdP+YOWS79BTdkB3XqJJSxutUy77hMwnOoyC290KSX2+m55ivcNIi+XWHSEVbxHqTRPeGwxH0ewE0bYk8WP3zCzZZolCsB2vTJxJsQEzzhuUjmFld37eGmUSu/bA+yVWds0SrRi7MANhpFxUsv7Y9aHdyC36Cbm82SGDo429vfYd0bnyW5xUx9Y0LoTH8XSC60yU4bkS1uHjbRxX1lb/ZWY8xe5eY10nFdllHejMALFqTZ58285vO8k5uvKCdw26eSKGvCVoZ3jPu5O11Ccg9w1XGcBRy0uZse/IP+PMxC+S135+uY5B6QGjTT1LEKN1tgqp/7OBz7Ibc6N0eJLGmtvWRvW98Vlyf2nnA/WvdQUd9SR6C75PtxuzxhJ56dbLHyhOar+I2ryK2kyIsvII0yrEd11CJ3SdqkzrrPRK2C3HPMIpMbctaa/LD0nUV9LahYMlFR+J61AXbn6i2/q6WlpaWlpaWlpaWlpaWlpaWl9Q/qP+A70LrMQEECAAAAAElFTkSuQmCC`}
                    alt="xx"
                    title="Що ты дзырыщь?"
                  />
                )}
                <div className={styles.content}>
                  <h2 className={styles.title}>{original_title}</h2>
                  {vote_average !== 0 ? (
                    <p className={styles.score}>
                      User Score: {vote_average * 10}%
                    </p>
                  ) : (
                    <p className={styles.score}>
                      Adequate creature doesn`t watch it...Think about it...
                    </p>
                  )}
                  {release_date ? 
                  <p className={styles.releaze}>Releaze date: {release_date}</p>
                    :
                  <p className={styles.releaze}>Releaze date: tomorrow</p>

                  }

                  {runtime !== null && runtime !== 0 ? (
                    <p className={styles.runtime}>Runtime: {runtime} min</p>
                  ) : (
                    <p className={styles.runtime}>
                      We don`t know how long does this shlack continue...
                    </p>
                  )}

                  <ul className={styles.genres}>
                    {genres !== undefined &&
                      genres.map((el) => {
                        return <li key={el.id}>{el.name}</li>;
                      })}
                  </ul>

                  <p className={styles.overview}>Overview: </p>
                  {overview ? (
                    <p className={styles.overviewCont}>{overview}</p>
                  ) : (
                    <p className={styles.overviewCont}>
                      No overview for this shlack...
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.second}>
              <h3 className={styles.addInfo}>Additional info :</h3>
              <NavLink
                className={styles.link}
                activeClassName={styles.active}
                to={{
                  pathname: `${match.url}/casts`,
                  state: {
                    id: match.params.id,
                  },
                }}
              >
                Casts
              </NavLink>
              <NavLink
              activeClassName={styles.active}
                className={styles.link}
                to={{
                  pathname: `${match.url}/reviews`,
                  state: {
                    id: match.params.id,
                  },
                }}
              >
                Reviews
              </NavLink>
            </div>
            <div className={styles.third}>
              <Route path={`${match.url}/casts`} render={(props) => <Cast {...props} id={this.props.match.params.id}/>} />
              <Route path={`${match.url}/reviews`}render={(props) => <Review {...props} id={this.props.match.params.id}/>} />
            </div>
          </>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}
