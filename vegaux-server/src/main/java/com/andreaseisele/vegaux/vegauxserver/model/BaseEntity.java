package com.andreaseisele.vegaux.vegauxserver.model;

import org.springframework.data.domain.Persistable;

import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;
import java.io.Serializable;

@MappedSuperclass
public abstract class BaseEntity<ID extends Serializable> implements Persistable<ID> {

    @Transient
    @Override
    public boolean isNew() {
        return null == getId();
    }

    @Override
    public String toString() {
        return String.format("Entity of type %s with id: %s", this.getClass().getName(), getId());
    }

    @Override
    public boolean equals(Object obj) {

        if (null == obj) {
            return false;
        }

        if (this == obj) {
            return true;
        }

        if (!getClass().equals(obj.getClass())) {
            return false;
        }

        BaseEntity<?> that = (BaseEntity<?>) obj;

        return null != this.getId() && this.getId().equals(that.getId());
    }

    @Override
    public int hashCode() {

        int hashCode = 17;

        hashCode += null == getId() ? 0 : getId().hashCode() * 31;

        return hashCode;
    }

}
